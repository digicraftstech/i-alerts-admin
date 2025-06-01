'use client';
import { AddScaleSchema } from '@/lib/validations';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createScale } from '@/lib/actions/scale.action';
import ROUTES from '@/constants/routes';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

const ScaleForm = () => {
  const form = useForm({
    resolver: zodResolver(AddScaleSchema),
    defaultValues: {
      ss_uid: '',
      oem_name: '',
      model_name: '',
      // threshold_weight: 0,
      // allocation_weight: 0,
      // location: {
      //   fixture: '',
      //   row: '',
      //   location_name: '',
      // },
    },
  });

  const handleAddScale = async (data: z.infer<typeof AddScaleSchema>) => {
    const result = await createScale(data);

    if (result.success) {
      toast.info('Scale added.');
      redirect(ROUTES.HOME);
    } else {
      form.setError('root', { message: result.error?.message });
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-5'
        onSubmit={form.handleSubmit(handleAddScale)}
      >
        <FormField
          control={form.control}
          name='ss_uid'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                UUID <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                />
              </FormControl>
              <FormDescription className='body-regular text-light-500'>
                Scan QR Code on the scale to get UUID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full flex-row justify-between items-center gap-2'>
          <FormField
            control={form.control}
            name='oem_name'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  OEM <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='model_name'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Model <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <div className='flex w-full flex-row justify-between items-center gap-2'>
          <FormField
            control={form.control}
            name='threshold_weight'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Threshold Weight <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                  />
                </FormControl>
                <FormDescription className='body-regular text-light-500'>
                  Min. Weight
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='allocation_weight'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Allocation Weight <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                  />
                </FormControl>
                <FormDescription className='body-regular text-light-500'>
                  Max. Weight
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='allocation_weight'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Allocation Weight <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                  />
                </FormControl>
                <FormDescription className='body-regular text-light-500'>
                  Max. Weight
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className='mt-5 flex flex-col items-center justify-center gap-3'>
          <div className='text-destructive-foreground mt-2'>
            {form.formState.errors?.root?.message && (
              <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
            )}
          </div>
          <Button
            type='submit'
            className='primary-gradient !text-light-900 w-fit'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Saving...' : 'Save Scale'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScaleForm;
