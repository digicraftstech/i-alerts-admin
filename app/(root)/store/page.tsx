import React from 'react';
import { DataTable } from '../scales/[id]/data-table';
import { BaseURL, iAlertsToken } from '@/constants';
import { deviceColumns } from './columns';
import StoreCard from '@/components/cards/StoreCard';

const getDevices = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', iAlertsToken!);

  try {
    const res = await fetch(`${BaseURL}/devices`, {
      method: 'GET',
      headers: headers,
    });
    const devices = await res.json();

    return devices.data;
  } catch (error) {
    console.log('Error while fetching data: ', error);
    return [];
  }
};

const Store = async () => {
  const devices = await getDevices();

  //   console.log('devices: ', devices);
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>
        {`Store Details: ${'[Store Name]'}`}
      </h1>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* <div className='flex flex-col mx-auto py-10 gap-6'> */}
        <StoreCard />
        <div className='flex flex-col gap-3'>
          <h3 className='h3-bold'>
            {`Active Devices`}
            <span className='subtle-regular text-dark400_light700 line-clamp-1 flex'>
              {`(Mobile devices logged into the iAlerts Mobile App)`}
            </span>
          </h3>

          <DataTable data={devices} columns={deviceColumns} />
        </div>
      </div>
    </div>
  );
};

export default Store;
