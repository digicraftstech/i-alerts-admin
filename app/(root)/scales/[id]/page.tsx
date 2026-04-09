import React from 'react';
import ReadingsTable from './readings-table';

import ScaleDetailsClient from './scale-details-client';
import { BaseURL, iAlertsToken } from '@/constants';

const getScale = async (id: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', iAlertsToken!);

  try {
    const res = await fetch(`${BaseURL}/scales/${id}`, {
      method: 'GET',
      headers: headers,
    });
    const scale = await res.json();

    return scale;
  } catch (error) {
    console.log('Error while fetching data: ', error);
    return null;
  }
};

interface ScaleParams {
  params: Promise<{ id: string }>;
}

const ScaleDetails = async ({ params }: ScaleParams) => {
  const { id } = await params;
  const scale = await getScale(id);
  // console.log('scale: ', scale);
  return (
    <>
      <div className='flex-between items-center'>
        <h1 className='h1-bold text-dark100_light900'>
          {scale.placement
            ? `${scale.placement.product.product_name}`
            : 'No Product'}{' '}
          @ {scale.location ? `${scale.location.location_name}` : 'No Location'}
        </h1>
      </div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* <div className='flex flex-col mx-auto py-10 gap-6'> */}
        <ScaleDetailsClient scale={scale} />

        <h3 className='h3-bold'>
          {/* {`Alert History`} */}
          {`Readings History`}
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex'>
            {/* {`(All low threshold alerts raised for this scale.)`} */}
            {`(All weight readings submitted for this scale.)`}
          </span>
        </h3>
        <ReadingsTable scaleId={id} intervalMs={10000} />
      </div>
    </>
  );
};

export default ScaleDetails;
