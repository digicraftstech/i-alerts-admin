import { RouteParams } from '@/types/global';

import React from 'react';

const ProductDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>ProductDetails for product: {id}</div>;
};

export default ProductDetails;
