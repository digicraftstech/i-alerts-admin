'use server';

import { ZodError, ZodSchema } from 'zod';
import { Session } from 'next-auth';
import { auth } from '@/auth';
import { ValidationError, UnauthorizedError } from '../http-errors';
import { IALERTS_TOKEN } from '@/constants';

type ActionOptions<T> = {
  params: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

// 1. Check if params and schema are provided and validated.
// 2. Check whether the user is authorized.
// 3. Connect to the Database.
// 4. Return the params and the sessionStorage.

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (params && schema) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        throw new Error('Schema validation failed.');
      }
    }
  }

  let session = null;
  if (authorize) {
    session = IALERTS_TOKEN;
    if (!session) return new UnauthorizedError('Unauthorized ...');
  }

  return { params, session };
}

export default action;
