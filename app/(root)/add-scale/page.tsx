import ScaleForm from '@/components/forms/ScaleForm';
import React from 'react';

const AddScale = () => {
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Add a Scale</h1>
      <div className='mt-9'>
        <ScaleForm />
      </div>
    </>
  );
};

export default AddScale;
