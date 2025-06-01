import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { RequestError, ValidationError } from '../http-errors';
import logger from '../logger';

export type ErrorType = 'api' | 'server';

const formatResponse = (
  errorType: ErrorType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  // console.log('formatResponse- responseContent ', responseContent);

  return { status, ...responseContent };

  return errorType === 'api'
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, errorType: ErrorType = 'server') => {
  if (error instanceof RequestError) {
    // logger.error(
    //   { err: error },
    //   `${errorType.toUpperCase()} Error: ${error.message}`
    // );
    console.log(
      ` - returning: errorType: ${errorType} status: ${error.statusCode} message: ${error.message} details: ${error.errors}`
    );

    const res = formatResponse(
      errorType,
      error.statusCode,
      error.message,
      error.errors
    );

    // console.log('handleError returns: ', res);

    return res;
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    logger.error(
      { err: error },
      `Validation Error: ${validationError.message}`
    );

    return formatResponse(
      errorType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formatResponse(errorType, 500, error.message);
  }

  logger.error({ err: error }, 'An unexpected error occurred.');
  return formatResponse(errorType, 500, 'An Unexpected error occurred.');
};

export default handleError;
