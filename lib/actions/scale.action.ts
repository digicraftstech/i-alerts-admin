'use server';

import {
  CreateScaleParams,
  UpdateScaleLocationParams,
  UpdateScaleProductParams,
} from '@/types/action';
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
import {
  AddScaleSchema,
  UpdateScaleLocationSchema,
  UpdateScaleProductSchema,
} from '../validations';

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

export async function updateScaleLocation(
  scaleId: string,
  params: UpdateScaleLocationParams
): Promise<ActionResponse<Scale> | ErrorResponse> {
  const validationResult = await action({
    params,
    schema: UpdateScaleLocationSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const response = (await api.scales.updateLocation(
      scaleId,
      validationResult.params.location!
    )) as ActionResponse<Scale>;

    if (response.success) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(response)),
        status: 200,
      };
    } else {
      const error = response.error;
      throw new RequestError(
        response.status,
        `${error?.message}`,
        error?.details
      );
    }
  } catch (error) {
    return handleError(error, 'api') as ErrorResponse;
  }
}

export async function updateScaleProduct(
  scaleId: string,
  params: UpdateScaleProductParams
): Promise<ActionResponse<Scale> | ErrorResponse> {
  const validationResult = await action({
    params,
    schema: UpdateScaleProductSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const response = (await api.scales.updateProductPlacement(
      scaleId,
      validationResult.params.placement!
    )) as ActionResponse<Scale>;

    if (response.success) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(response)),
        status: 200,
      };
    } else {
      const error = response.error;
      throw new RequestError(
        response.status,
        `${error?.message}`,
        error?.details
      );
    }
  } catch (error) {
    return handleError(error, 'api') as ErrorResponse;
  }
}
