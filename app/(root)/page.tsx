import { auth } from '@/auth';
import React from 'react';
import { API_BASE_URL, IALERTS_TOKEN } from '@/constants';
import ScaleCard from '@/components/cards/ScaleCard';
import handleError from '@/lib/handlers/error';
import { NotFoundError, ValidationError } from '@/lib/http-errors';

const getScales = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  try {
    const res = await fetch(`${API_BASE_URL}/scales`, {
      method: 'GET',
      headers: headers,
    });
    const scales = await res.json();

    return scales.data;
  } catch (error) {
    console.log('Error while fetching data: ', error);
    return [];
  }
};

const testError = async () => {
  try {
    // throw new Error('Test Error');
    // throw new NotFoundError('Home');
    throw new ValidationError({
      title: ['Required'],
      tags: ['"Javascript" is not a valid tag.'],
    });
  } catch (error) {
    return handleError(error);
  }
};

const Home = async () => {
  // const result = await testError();
  // console.log(result);

  const session = await auth();
  const scales = await getScales();

  return (
    <div>
      <h5 className='text-primary-500'>{session?.user?.name} </h5>
      <h1 className='h2-bold'>Dashboard</h1>
      <div className='mt-10 flex w-full flex-row flex-wrap max-sm:flex-col gap-9'>
        {scales && scales.length ? (
          scales.map((scale: Scale) => (
            <ScaleCard key={scale.ss_id} scale={scale} />
          ))
        ) : (
          <h1>No scales added.</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
