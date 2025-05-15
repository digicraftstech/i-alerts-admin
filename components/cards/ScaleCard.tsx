import ROUTES from '@/constants/routes';
import { getDateTimeString } from '@/lib/utils';
import Link from 'next/link';

import React from 'react';
import Metric from '../Metric';

interface ScaleCardProps {
  scale: Scale;
}

const ScaleCard = ({
  scale: {
    ss_id,
    ss_unique_name,
    last_reading,
    last_reading_datetime,
    status,
    threshold_weight,
    allocation_weight,
    product,
  },
}: ScaleCardProps) => {
  const bgColor = status
    ? `card-background-${status}`
    : 'card-background-regular';

  return (
    <div className={`card-wrapper rounded-[10px] p-9 sm:px-11 ${bgColor}`}>
      <div className='flex flex-col-reverse items-start justify-between gap-6 sm:flex-row'>
        <div>
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex'>
            {`Updated At: ${getDateTimeString(
              new Date(last_reading_datetime)
            )}`}
          </span>
          <Link href={ROUTES.SCALE(ss_id)}>
            <h3 className='base-semibold'>{ss_unique_name}</h3>
          </Link>
        </div>
      </div>
      <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
        <div className='mt-3.5 flex w-full flex-wrap gap-2'>
          {`Current Weight: ${last_reading} ${product.weight_unit}`}
        </div>
        <div className='mt-3.5 flex w-full flex-wrap gap-2'>
          {`${product.product_plu} ${product.product_name}`}
        </div>
      </div>
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
          <Metric
            value={allocation_weight}
            unit={product.weight_unit}
            title='Allocation Weight: '
            textStyles='small-medium text-dark400_light800'
          />
          <Metric
            value={threshold_weight}
            unit={product.weight_unit}
            title='Threshold Weight: '
            textStyles='small-medium text-dark400_light800'
          />
        </div>
      </div>
    </div>
    // <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
    //   <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
    //     <div>
    //       <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
    //         {getDateTimeString(new Date(last_reading_datetime))}
    //       </span>
    //       <Link href={ROUTES.SCALE(ss_id)}>
    //         <h3 className='base-semibold'>{ss_unique_name}</h3>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ScaleCard;
