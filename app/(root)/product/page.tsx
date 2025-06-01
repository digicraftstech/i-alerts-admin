import React from 'react';

import ProductCard from '@/components/cards/ProductCard';

import { ActionResponse, ItemArrayResponse, Product } from '@/types/global';
import { getAllProducts } from '@/lib/actions/product.action';

const getProducts = async () => {
  const result = (await getAllProducts()) as ActionResponse<Product>;
  const data = result.data as ItemArrayResponse<Product>;
  console.log('proucts- dataArray: ', data.data);
  return data.data as Product[];
};

const Catalog = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {products && products.length ? (
          products.map((product: Product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <h1>No product added.</h1>
        )}
      </div>
    </div>
  );
};

export default Catalog;
