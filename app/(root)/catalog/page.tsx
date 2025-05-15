import React from 'react';

import { API_BASE_URL } from '@/constants';
import ProductCard from '@/components/cards/ProductCard';

const IALERTS_TOKEN = process.env.IALERTS_TOKEN as string;

export const getProducts = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    headers: headers,
  });
  const products = await res.json();
  return products.data;
};

const Catalog = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {products.map((product: Product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
