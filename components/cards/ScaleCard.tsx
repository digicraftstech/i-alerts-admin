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

  console.log('bgColor: ', bgColor);
  return (
    <div
      className={`card-wrapper rounded-[10px] min-w-[300px] p-9 sm:px-11 ${bgColor}`}
    >
      <Link href={ROUTES.SCALE(ss_id)}>
        <div>
          <div>
            <span className='subtle-regular text-dark400_light700 line-clamp-1 flex'>
              {ss_unique_name}
            </span>
            <h3 className='base-semibold'>{`${product.product_plu} ${product.product_name}`}</h3>
          </div>
        </div>
        <div className='mt-2'>
          <div className='mt-1 small-medium'>
            Last Reading{': '}
            <span className='body-bold'>{`${last_reading} ${product.weight_unit}`}</span>
            {/* {`Last Reading: ${last_reading} ${product.weight_unit}`} */}
          </div>
          <div className='mt-1 small-medium'>
            {`Updated At: ${getDateTimeString(
              new Date(last_reading_datetime)
            )}`}
          </div>
        </div>
        <div className='mt-3.5'>
          <div className='mt-1 '>
            <Metric
              value={allocation_weight}
              unit={product.weight_unit}
              title='Allocation Weight: '
              textStyles='small-medium text-dark400_light800'
            />
          </div>
          <div className='mt-1 '>
            <Metric
              value={threshold_weight}
              unit={product.weight_unit}
              title='Threshold Weight: '
              textStyles='small-medium text-dark400_light800'
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ScaleCard;
