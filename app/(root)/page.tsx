import { auth } from '@/auth';
import React from 'react';
import { API_BASE_URL, IALERTS_TOKEN } from '@/constants';
import ScaleCard from '@/components/cards/ScaleCard';

const getScales = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  const res = await fetch(`${API_BASE_URL}/scales`, {
    method: 'GET',
    headers: headers,
  });
  const scales = await res.json();
  return scales.data;
};

const Home = async () => {
  const session = await auth();
  // console.log('Session: ', session);
  const scales = await getScales();

  return (
    <div>
      <h5 className='text-primary-500'>{session?.user?.name} </h5>
      <h1 className='h2-bold'>Welcome to i-Alert Insights</h1>
      <div className='mt-10 flex w-full flex-row flex-wrap max-sm:flex-col gap-9'>
        {scales.map((scale: Scale) => (
          <ScaleCard key={scale.ss_id} scale={scale} />
        ))}
      </div>
    </div>
  );
};

export default Home;
