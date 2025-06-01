'use client';
import { ProductSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { Button } from '../ui/button';
import { createProduct } from '@/lib/actions/product.action';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { z } from 'zod';
import { Base64Image } from '../Base64Image';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import ROUTES from '@/constants/routes';

const ProductForm = () => {
  const form = useForm({
    resolver: zodResolver(ProductSchema),

    defaultValues: {
      product_name: '',
      product_plu: 0,
      weight_unit: 'lbs',
      image: '',
    },
  });

  const handleAddProduct = async (data: z.infer<typeof ProductSchema>) => {
    const result = await createProduct(data);

    if (result.success) {
      toast.info('Product added.');
      redirect(ROUTES.CATALOG);
    } else {
      form.setError('root', { message: result.error?.message });
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-15'
        onSubmit={form.handleSubmit(handleAddProduct)}
      >
        <div className='flex w-full flex-row justify-between items-center gap-5'>
          <FormField
            control={form.control}
            name='product_name'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Name <span className='text-primary-500'>*</span>
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
            name='product_plu'
            render={({ field: { onChange, ...rest } }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  PLU Code <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...rest}
                    onChange={(event) =>
                      event.target.value &&
                      onChange?.(parseInt(event.target.value, 10))
                    }
                    className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-row gap-4'>
          <FormField
            control={form.control}
            name='weight_unit'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel className='paragraph-semibold text-dark400_light800 mb-2'>
                  Weight Unit <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-2'
                  >
                    <FormItem className='flex flex-row'>
                      <FormControl>
                        <RadioGroupItem value='lbs' />
                      </FormControl>
                      <FormLabel className='paragraph-semibold text-dark400_light800 mb-2'>
                        Lbs
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex flex-row'>
                      <FormControl>
                        <RadioGroupItem value='kg' />
                      </FormControl>
                      <FormLabel className='paragraph-semibold text-dark400_light800 mb-2'>
                        Kg
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel className='paragraph-semibold text-dark400_light800 mb-2'>
                  Product Image<span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Base64Image
                    value={field.value}
                    defaultImagePath='./images/placeholder.svg'
                    buttonStyle={'primary-gradient'}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
            {form.formState.isSubmitting ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
