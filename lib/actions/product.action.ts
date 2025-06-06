'use server';

import { CreateProductParams } from '@/types/action';
import {
  ActionResponse,
  ErrorResponse,
  ItemArrayResponse,
  Product,
} from '@/types/global';
import action from '../handlers/actions';
import { ProductSchema } from '../validations';
import handleError from '../handlers/error';
import { api } from '../api';
import { RequestError } from '../http-errors';

export async function createProduct(
  params: CreateProductParams
): Promise<ActionResponse<Product> | ErrorResponse> {
  const validationResult = await action({
    params,
    schema: ProductSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const response = (await api.products.create(
      validationResult.params!
    )) as ActionResponse<Product>;

    //Create product returns a single product in in response
    // console.log('Return from create: - response: ', response);

    if (response.success) {
      // console.log('Product added returning data: ', JSON.stringify(response));
      return {
        success: true,
        data: JSON.parse(JSON.stringify(response)),
        status: 200,
      };
    } else {
      // console.log('createProduct: returned error response: ', response.error);

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
    // console.log('Caught error in createProduct: ', error);
    return handleError(error, 'api') as ErrorResponse;
  }
}

export async function getAllProducts(): Promise<
  ActionResponse<Product> | ErrorResponse
> {
  try {
    const response = (await api.products.getAll()) as ActionResponse<Product>;

    //Create product returns a single product in in response
    // console.log('Return from getAll: - response: ', response.data);

    if (response.success) {
      const responseData = JSON.parse(JSON.stringify(response.data));
      return {
        success: true,
        data: responseData as ItemArrayResponse<Product>,
        status: 200,
      };
    } else {
      // console.log('createProduct: returned error response: ', response.error);

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
    // console.log('Caught error in createProduct: ', error);
    return handleError(error, 'api') as ErrorResponse;
  }
}
