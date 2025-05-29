'user server';

import { CreateProductParams } from '@/types/action';
import { ActionResponse, ErrorResponse } from '@/types/global';
import action from '../handlers/actions';
import { ProductSchema } from '../validations';
import handleError from '../handlers/error';

export async function createProduct(
  params: CreateProductParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: ProductSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
