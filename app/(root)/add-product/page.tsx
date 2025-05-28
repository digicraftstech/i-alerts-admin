import ProductForm from '@/components/forms/ProductForm';

import React from 'react';

const AddProduct = () => {
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Add a Product</h1>
      <div className='mt-9'>
        <ProductForm />
      </div>
    </>
  );
};

export default AddProduct;
