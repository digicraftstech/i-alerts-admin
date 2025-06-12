import React from 'react';
import { DataTable } from './data-table';
import { notificationColumns } from './columns';
import ScaleCardCompact from '@/components/cards/ScaleCardCompact';
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

const getNotifications = async (id: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', iAlertsToken!);

  try {
    const res = await fetch(`${BaseURL}/scales/${id}/notifications`, {
      method: 'GET',
      headers: headers,
    });
    const notifications = await res.json();

    return notifications.data;
  } catch (error) {
    console.log('Error while fetching data: ', error);
    return [];
  }
};

const ScaleDetails = async ({ params }: ScaleParams) => {
  const { id } = await params;

  const notifications = await getNotifications(id);
  const scale = await getScale(id);
  // console.log('scale: ', scale);
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>
        {scale.placement
          ? `${scale.placement.product.product_name}`
          : 'No Product'}{' '}
        @ {scale.location ? `${scale.location.location_name}` : 'No Location'}
      </h1>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* <div className='flex flex-col mx-auto py-10 gap-6'> */}
        <ScaleCardCompact scale={scale} />
        <DataTable data={notifications} columns={notificationColumns} />
      </div>
    </div>
  );
};

export default ScaleDetails;
