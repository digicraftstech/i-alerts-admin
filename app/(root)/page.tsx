import { auth } from '@/auth';
import React from 'react';
import ScaleCard from '@/components/cards/ScaleCard';

import { ActionResponse, ItemArrayResponse, Scale } from '@/types/global';
import { getAllScales } from '@/lib/actions/scale.action';

const getScales = async () => {
  const result = (await getAllScales()) as ActionResponse<Scale>;
  const data = result.data as ItemArrayResponse<Scale>;
  // console.log('scales- dataArray: ', data.data);
  return data.data as Scale[];
};

// const testError = async () => {
//   try {
//     return await api.scales.getAll();
//     // throw new Error('Test Error');
//     // throw new NotFoundError('Home');
//     // throw new ValidationError({
//     //   title: ['Required'],
//     //   tags: ['"Javascript" is not a valid tag.'],
//     // });
//   } catch (error) {
//     return handleError(error);
//   }
// };

const Home = async () => {
  // const result = await testError();
  // console.log('testError- Result: ', result);

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
