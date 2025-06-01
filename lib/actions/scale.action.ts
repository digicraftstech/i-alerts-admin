'use server';

import { CreateScaleParams } from '@/types/action';
import {
  ActionResponse,
  ErrorResponse,
  ItemArrayResponse,
  Scale,
} from '@/types/global';
import action from '../handlers/actions';
import handleError from '../handlers/error';
import { api } from '../api';
import { RequestError } from '../http-errors';
import { AddScaleSchema } from '../validations';

export async function createScale(
  params: CreateScaleParams
): Promise<ActionResponse<Scale> | ErrorResponse> {
  const validationResult = await action({
    params,
    schema: AddScaleSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const response = (await api.scales.create(
      validationResult.params!
    )) as ActionResponse<Scale>;

    //Create scale returns a single scale in response
    // console.log('Return from create: - response: ', response);

    if (response.success) {
      // console.log('Scale added returning data: ', JSON.stringify(response));
      return {
        success: true,
        data: JSON.parse(JSON.stringify(response)),
        status: 200,
      };
    } else {
      // console.log('createScale: returned error response: ', response.error);

      const error = response.error;
      throw new RequestError(
        response.status,
        `${error?.message}`,
        error?.details
      );

      // return {
      //   success: false,
      //   status: response.status,
      //   error: error,
      // };
    }
  } catch (error) {
    // console.log('Caught error in createScale: ', error);
    return handleError(error, 'api') as ErrorResponse;
  }
}

export async function getAllScales(): Promise<
  ActionResponse<Scale> | ErrorResponse
> {
  try {
    const response = (await api.scales.getAll()) as ActionResponse<Scale>;

    //Create scale returns a single scale in in response
    // console.log('Return from getAll: - response: ', response.data);

    if (response.success) {
      const responseData = JSON.parse(JSON.stringify(response.data));
      return {
        success: true,
        data: responseData as ItemArrayResponse<Scale>,
        status: 200,
      };
    } else {
      // console.log('createScale: returned error response: ', response.error);

      const error = response.error;
      throw new RequestError(
        response.status,
        `${error?.message}`,
        error?.details
      );

      // return {
      //   success: false,
      //   status: response.status,
      //   error: error,
      // };
    }
  } catch (error) {
    // console.log('Caught error in createScale: ', error);
    return handleError(error, 'api') as ErrorResponse;
  }
}
