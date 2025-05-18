import React from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AddScaleSchema } from '@/lib/validations';

const AddScale = () => {
  const form = useForm<z.infer<typeof AddScaleSchema>>({
    resolver: zodResolver(AddScaleSchema),
    defaultValues: {
      uuid: '',
      name: '',
      fixture: 0,
      row: 'Front',
      location: '',
      product: '',
    },
  });
  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-10'
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Question Title <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  required
                  className='paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormDescription className='body-regular text-light-500 mt-2.5'>
                Be specific and imagine you are asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddScale;
