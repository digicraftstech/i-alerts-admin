'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z, ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toTitleCase } from '@/lib/utils';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit?: (data: T) => Promise<{ success: boolean }>;
  formType: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
}: // onSubmit,
AuthFormProps<T>) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO:
  };

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Sign Up';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='mt-10 space-y-6'
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className='flex flex-col w-full gap-2.5'>
                <FormLabel className='paragraph-medium text-dark400_light700'>
                  {field.name === 'email'
                    ? 'Email Address'
                    : toTitleCase(field.name)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === 'password' ? 'password' : 'text'}
                    {...field}
                    className='paragraph-regular backgroundg-light900-dark300 border light-border-2 text-dark300_light700 not-focus min-h-12 rounded-1.5'
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? buttonText === 'Sign In'
              ? 'Signing in...'
              : 'Signing up...'
            : buttonText}
        </Button>
        {formType === 'SIGN_IN' ? (
          <p>
            Don&apos;t have an account?{' '}
            <Link
              href={ROUTES.SIGN_UP}
              className='paragraph-semibold primary-text-gradient'
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link
              href={ROUTES.SIGN_IN}
              className='paragraph-semibold primary-text-gradient'
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;

// import React from 'react';

// const AuthForm = () => {
//   return <div>AuthForm</div>;
// };

// export default AuthForm;
