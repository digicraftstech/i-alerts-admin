'use client';
import { ProductSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Path, useForm } from 'react-hook-form';
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
import { toBase64, toTitleCase } from '@/lib/utils';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@radix-ui/react-select';
import { Button } from '../ui/button';

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  console.log('getImageData: displayUrl: ', displayUrl);

  return { files, displayUrl };
}

const ProductForm = () => {
  const [preview, setPreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      product_name: '',
      product_plu: '',
      weight_unit: 'lbs',
      image: '',
    },
  });

  const handleImageChange = async (files: FileList) => {
    if (files && files.length > 0) {
      const file = files[0];
      const base64 = (await toBase64(file)) as string;
      setImageBase64(base64);
    }
  };

  const handleAddProduct = () => {};

  //   function submitForm(value: RegisterCircleInputClient) {
  //     console.log({ value });
  //   }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-5'
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
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  PLU Code <span className='text-primary-500'>*</span>
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

        <FormField
          control={form.control}
          name='weight_unit'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <FormLabel className='paragraph-semibold text-dark400_light800 mb-2'>
                Weight Unit <span className='text-primary-500'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Unit - lbs/kg' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='lbs'>Lbs</SelectItem>
                  <SelectItem value='kg'>Kg</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full flex-row justify-between items-center gap-5'>
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Image <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='flex flex-row gap-4 items-center'>
                    <Input
                      {...field}
                      className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                      type='file'
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        // console.log('displayUrl: ', displayUrl);
                        setPreview(displayUrl);
                        handleImageChange(files);
                      }}
                    />
                    <div>
                      <Avatar className='w-24 h-24'>
                        <AvatarImage src={preview} />
                        <AvatarFallback>Product</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='mt-5 flex justify-center '>
          <Button
            type='submit'
            className='primary-gradient !text-light-900 w-fit'
          >
            Save Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
