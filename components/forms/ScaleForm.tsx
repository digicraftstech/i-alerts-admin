'use client';
import { AddScaleSchema } from '@/lib/validations';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import {
  createScale,
  updateScaleLocation,
  updateScaleProduct,
} from '@/lib/actions/scale.action';
import { getAllProducts } from '@/lib/actions/product.action';
import { ROW_OPTIONS } from '@/constants';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { Base64Image } from '../Base64Image';
import {
  Scale,
  Product,
  ActionResponse,
  ItemArrayResponse,
} from '@/types/global';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../ui/select';
import ROUTES from '@/constants/routes';
import {
  gramsToKilograms,
  gramsToPounds,
  kilogramsToGrams,
} from '@/lib/conversions';
import { poundsToGrams } from '@/lib/conversions';

interface ScaleFormProps {
  scale?: Scale;
}

const ScaleForm = ({ scale }: ScaleFormProps) => {
  const router = useRouter();
  const isEditMode = !!scale;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [selectedProductImage, setSelectedProductImage] = useState<string>(
    scale?.placement?.product?.image ?? '/images/placeholder.svg'
  );
  const initialLocation = {
    fixture_no: scale?.location?.fixture_no
      ? String(scale.location.fixture_no)
      : '',
    row: scale?.location?.fixture_no ? String(scale.location.row) : '',
    location_name: scale?.location?.location_name || '',
  };
  const initialProduct = {
    product_id: scale?.placement?.product_id
      ? String(scale.placement.product_id)
      : scale?.placement?.product?.product_id
        ? String(scale.placement.product.product_id)
        : '',
    weight_unit: scale?.placement?.weight_unit ?? 'lbs',
  };
  const initialAllocationWeight =
    initialProduct.weight_unit === 'lbs'
      ? gramsToPounds(scale?.placement?.allocation_weight ?? 0)
      : gramsToKilograms(scale?.placement?.allocation_weight ?? 0);

  const initialThresholdWeight =
    initialProduct.weight_unit === 'lbs'
      ? gramsToPounds(scale?.placement?.threshold_weight ?? 0)
      : gramsToKilograms(scale?.placement?.threshold_weight ?? 0);

  const form = useForm({
    resolver: zodResolver(AddScaleSchema),
    defaultValues: {
      ss_uid: scale?.ss_unique_name || '',
      oem_name: scale?.oem_name || '',
      model_name: scale?.model_name || '',
      location: {
        fixture_no: initialLocation.fixture_no,
        row: initialLocation.row,
        location_name: initialLocation.location_name,
      },
      placement: {
        allocation_weight: initialAllocationWeight,
        threshold_weight: initialThresholdWeight,
        weight_unit: initialProduct.weight_unit,
        product_id: initialProduct.product_id,
      },
    },
  });

  // useEffect(() => {
  //   console.log('weight_unit:', form.watch('product.weight_unit'));
  // }, [form.watch('product.weight_unit')]);

  // useEffect(() => {
  //   console.log('product.image:', form.watch('product.image'));
  // }, [form.watch('product.image')]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const result = (await getAllProducts()) as ActionResponse<Product>;
        const data = result.data as ItemArrayResponse<Product>;
        setProducts(data.data as Product[]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const watchedProductId = useWatch({
    control: form.control,
    name: 'placement.product_id',
  });

  // Watch for product selection changes and update the image
  useEffect(() => {
    const productId = watchedProductId;
    if (productId) {
      const selectedProduct = products.find(
        (p) => String(p.product_id) === String(productId)
      );
      if (selectedProduct) {
        setSelectedProductImage(
          selectedProduct.image ?? '/images/placeholder.svg'
        );
      }
    } else {
      setSelectedProductImage('/images/placeholder.svg');
      form.setValue('placement.weight_unit', undefined);
    }
  }, [watchedProductId, products, form]);

  const handleAddScale = async (data: z.infer<typeof AddScaleSchema>) => {
    const result = await createScale(data);

    if (result.success) {
      toast.info(isEditMode ? 'Scale updated.' : 'Scale added.');
      redirect(isEditMode ? ROUTES.SCALE(scale!.ss_id) : ROUTES.HOME);
    } else {
      form.setError('root', { message: result.error?.message });
    }
  };

  const handleUpdateLocation = async () => {
    if (!scale) return;
    setIsUpdatingLocation(true);

    const locationValues = form.getValues('location') ?? {};

    const rowValue = locationValues.row;
    const rowNumber =
      rowValue === '' || rowValue === undefined ? undefined : Number(rowValue);

    const fixtureValue = locationValues.fixture_no;
    const fixtureNumber =
      fixtureValue === '' || fixtureValue === undefined
        ? undefined
        : Number(fixtureValue);

    const result = await updateScaleLocation(scale.ss_id, {
      location: {
        ...locationValues,
        fixture_no: fixtureNumber,
        row: rowNumber,
      },
    });

    if (result.success) {
      toast.info('Location updated.');
    } else {
      toast.error(result.error?.message ?? 'Failed to update location.');
    }

    setIsUpdatingLocation(false);
  };

  const handleCancelLocation = () => {
    form.setValue('location.fixture_no', initialLocation.fixture_no);
    form.setValue('location.row', initialLocation.row);
    form.setValue('location.location_name', initialLocation.location_name);
  };

  const handleUpdateProduct = async () => {
    if (!scale) return;
    setIsUpdatingProduct(true);

    const weight_unit = form.getValues('placement.weight_unit') || undefined;
    const product_id = form.getValues('placement.product_id') || undefined;
    let allocation_weight =
      form.getValues('placement.allocation_weight') ?? undefined;
    let threshold_weight =
      form.getValues('placement.threshold_weight') ?? undefined;

    //If selected unit is lbs, convert the number to ks before sending
    if (allocation_weight) {
      if (weight_unit === 'lbs')
        allocation_weight = poundsToGrams(allocation_weight);
      else allocation_weight = kilogramsToGrams(allocation_weight);
    }
    if (threshold_weight) {
      if (weight_unit === 'lbs')
        threshold_weight = poundsToGrams(threshold_weight);
      else threshold_weight = kilogramsToGrams(threshold_weight);
    }

    const result = await updateScaleProduct(scale.ss_id, {
      placement: {
        weight_unit: weight_unit,
        product_id: product_id,
        allocation_weight: allocation_weight,
        threshold_weight: threshold_weight,
      },
    });

    if (result.success) {
      toast.info('Product updated.');
    } else {
      toast.error(result.error?.message ?? 'Failed to update product.');
    }

    setIsUpdatingProduct(false);
  };

  const handleCancelProduct = () => {
    form.setValue('placement.product_id', initialProduct.product_id);
    form.setValue('placement.weight_unit', initialProduct.weight_unit);
    setSelectedProductImage(
      scale?.placement?.product?.image ?? '/images/placeholder.svg'
    );
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
        <div className='flex w-full flex-row justify-start gap-3'>
          <Button
            type='submit'
            className='primary-gradient !text-light-900 w-fit'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? 'Saving...'
              : isEditMode
                ? 'Update Scale'
                : 'Save Scale'}
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-fit'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
        <div className='border-t border-light-300 dark:border-light-500' />

        <div className='flex w-full flex-row justify-between items-center gap-2'>
          <div className='flex w-1/2 flex-row items-center gap-2'>
            <FormField
              control={form.control}
              name='location.location_name'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel className='paragraph-semibold text-dark400_light800 whitespace-nowrap'>
                    Location <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Location Name'
                      className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px] flex-1'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex w-1/2 flex-row items-center gap-2'>
            <FormField
              control={form.control}
              name='location.fixture_no'
              render={({ field }) => (
                <FormItem className='flex flex-col flex-1'>
                  <FormLabel className='paragraph-semibold text-dark400_light800 whitespace-nowrap'>
                    Fixture <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Fixture'
                      className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location.row'
              render={({ field }) => (
                <FormItem className='flex flex-col w-fit'>
                  <FormLabel className='paragraph-semibold text-dark400_light800 whitespace-nowrap'>
                    Row <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ''}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Row' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Rows</SelectLabel>
                          {ROW_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label} ({option.value})
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='flex w-full flex-row justify-start'>
          <Button
            type='button'
            className='primary-gradient !text-light-900 w-fit'
            onClick={handleUpdateLocation}
            disabled={!isEditMode || isUpdatingLocation}
          >
            {isUpdatingLocation ? 'Updating...' : 'Update Location'}
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-fit ml-3'
            onClick={handleCancelLocation}
            disabled={!isEditMode || isUpdatingLocation}
          >
            Cancel
          </Button>
        </div>
        <div className='border-t border-light-300 dark:border-light-500' />

        <div className='flex w-full flex-row justify-between items-center gap-2'>
          <div className='flex w-1/2 flex-row items-center gap-2'>
            <FormField
              control={form.control}
              name='placement.product_id'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel className='paragraph-semibold text-dark400_light800 whitespace-nowrap'>
                    Product <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <div className='flex w-full flex-row items-center gap-4'>
                    <FormControl className='flex-1'>
                      <Select
                        value={field.value ? String(field.value) : ''}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a product' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Products</SelectLabel>
                            {isLoadingProducts ? (
                              <div className='p-2 text-sm text-gray-500'>
                                Loading products...
                              </div>
                            ) : products.length > 0 ? (
                              products.map((product) => (
                                <SelectItem
                                  key={product.product_id}
                                  value={String(product.product_id)}
                                >
                                  {product.product_plu} - {product.product_name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className='p-2 text-sm text-gray-500'>
                                No products available
                              </div>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <Base64Image
                      value={selectedProductImage}
                      defaultImagePath='/images/placeholder.svg'
                      buttonStyle={'primary-gradient'}
                      editable={false}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-1/2 flex-row items-center gap-2'></div>
        </div>

        <div className='flex w-full flex-row justify-between items-center gap-2'>
          <div className='flex w-1/2 flex-row items-center gap-2'>
            <FormField
              control={form.control}
              name='placement.allocation_weight'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel className='paragraph-semibold text-dark400_light800'>
                    Allocation Weight{' '}
                    <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      value={field.value ?? ''}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        field.onChange(
                          nextValue === '' ? undefined : Number(nextValue)
                        );
                      }}
                      className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-1/2 flex-row items-center gap-2'>
            <FormField
              control={form.control}
              name='placement.threshold_weight'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel className='paragraph-semibold text-dark400_light800'>
                    Threshold Weight <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      value={field.value ?? ''}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        field.onChange(
                          nextValue === '' ? undefined : Number(nextValue)
                        );
                      }}
                      className='paragraph-regular backgroundg-light700-dark300 border light-border-2 text-dark300_light700 not-focus min-h-[36px]'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='placement.weight_unit'
              render={({ field }) => (
                <FormItem className='flex w-fit flex-col'>
                  <FormLabel className='paragraph-semibold text-dark400_light800 whitespace-nowrap'>
                    Unit <span className='text-primary-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select unit' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Units</SelectLabel>
                          <SelectItem value='lbs'>lbs</SelectItem>
                          <SelectItem value='kg'>kg</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='flex w-full flex-row justify-start'>
          <Button
            type='button'
            className='primary-gradient !text-light-900 w-fit'
            onClick={handleUpdateProduct}
            disabled={!isEditMode || isUpdatingProduct}
          >
            {isUpdatingProduct ? 'Updating...' : 'Update Product'}
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-fit ml-3'
            onClick={handleCancelProduct}
            disabled={!isEditMode || isUpdatingProduct}
          >
            Cancel
          </Button>
        </div>
        <div className='border-t border-light-300 dark:border-light-500' />

        <div className='mt-5 text-destructive-foreground'>
          {form.formState.errors?.root?.message && (
            <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ScaleForm;
