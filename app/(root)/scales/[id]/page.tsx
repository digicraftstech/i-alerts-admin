import { API_BASE_URL, IALERTS_TOKEN } from '@/constants';
import React from 'react';
import { DataTable } from './data-table';
import { notificationColumns } from './columns';
import ScaleCard from '@/components/cards/ScaleCard';

const getScale = async (id: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  try {
    const res = await fetch(`${API_BASE_URL}/scales/${id}`, {
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

// const getReadings = async (id: string) => {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   headers.append('x-token', IALERTS_TOKEN);

//   try {
//     const res = await fetch(`${API_BASE_URL}/scales/${id}/readings`, {
//       method: 'GET',
//       headers: headers,
//     });
//     const readings = await res.json();

//     return readings.data;
//   } catch (error) {
//     console.log('Error while fetching data: ', error);
//     return [];
//   }
// };

interface ScaleParams {
  params: Promise<{ id: string }>;
}

const getNotifications = async (id: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  try {
    const res = await fetch(`${API_BASE_URL}/scales/${id}/notifications`, {
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
  return (
    <div className='flex flex-col mx-auto py-10 gap-6'>
      <ScaleCard scale={scale} />
      <DataTable data={notifications} columns={notificationColumns} />
    </div>
  );
};

export default ScaleDetails;
