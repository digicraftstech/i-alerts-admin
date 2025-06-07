import { ActionResponse, APIErrorResponse, FetchOptions } from '@/types/global';
import logger from '../logger';
import handleError from './error';
import {
  DuplicateError,
  RequestError,
  UnauthorizedError,
} from '../http-errors';
import { iAlertsToken } from '@/constants';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(url: string, options: FetchOptions = {}) {
  const {
    timeout = 5000,
    headers: customHeaders = { 'x-token': iAlertsToken! },
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    // console.log('fetch - response: ', response);

    const responseBody = await response.json();

    clearTimeout(id);

    if (!response.ok) {
      if (responseBody.status === 403) throw new DuplicateError('Resource');

      if (responseBody.status === 401) throw new UnauthorizedError();

      throw new RequestError(response.status, `${responseBody.message}`);
    }

    return {
      success: true,
      data: responseBody,
      status: response.status,
    } as ActionResponse<T>;
  } catch (err) {
    const error = isError(err) ? err : new Error('Unknown error');
    if (error.name === 'AbortError') {
      logger.warn(`Request to ${url} timed out.`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error, 'api') as APIErrorResponse;
  }
}
