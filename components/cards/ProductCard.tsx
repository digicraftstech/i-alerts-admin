/* eslint-disable @next/next/no-img-element */
import ROUTES from '@/constants/routes';
import { Product } from '@/types/global';

import Link from 'next/link';

import React from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product: { product_id, product_name, product_plu, image },
}: ProductCardProps) => {
  return (
    <div className='card-wrapper rounded-[10px] py-6 px-6 sm:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div className='flex flex-row gap-5'>
          <img
            src={image}
            alt={product_name}
            width={64}
            height={64}
            className='rounded-lg border-2'
          />
          <div className='flex flex-col gap-3.5'>
            <Link href={ROUTES.SCALE(product_id)}>
              <h3 className='base-semibold'>{product_name}</h3>
            </Link>
            <span className='subtle-regular text-dark400_light700 line-clamp-1 flex'>
              {`PLU -${product_plu}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
