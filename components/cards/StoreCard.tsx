import Image from 'next/image';
import React from 'react';

const StoreCard = () => {
  return (
    <div className='card-wrapper card-background-unassigned rounded-[10px] py-6 px-6 sm:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div className='flex flex-row gap-5'>
          <Image
            src={'./images/placeholder.svg'}
            alt={'store'}
            width={64}
            height={64}
            className='rounded-lg'
          />
          <div className='flex flex-col gap-3.5'>
            <h3 className='base-semibold'>{'[Store Name]'}</h3>
            <span className='subtle-regular text-dark400_light700 line-clamp-1 flex'>
              {`Other details - []`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
