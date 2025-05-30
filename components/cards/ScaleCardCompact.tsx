import ROUTES from '@/constants/routes';
import { getConvertedWeightString } from '@/lib/conversions';
import { getDateTimeString } from '@/lib/utils';
import Link from 'next/link';

import React from 'react';

interface ScaleCardProps {
  scale: Scale;
}

const ScaleCardCompact = ({
  scale: {
    ss_id,
    ss_unique_name,
    last_reading,
    last_reading_datetime,
    status,
    product,
    location,
  },
}: ScaleCardProps) => {
  const bgColor = status
    ? `card-background-${status}`
    : 'card-background-regular';

  return (
    <div
      className={`card-wrapper rounded-[10px] min-w-[300px] p-9 sm:px-11 ${bgColor}`}
    >
      <Link href={ROUTES.SCALE(ss_id)}>
        <div>
          <div>
            <span className='small-medium text-dark400_light700 line-clamp-1 flex'>
              {ss_unique_name}
            </span>
            <h3 className='base-semibold'>{`${product.product_plu} ${product.product_name}`}</h3>
          </div>
        </div>
        <div className='mt-2'>
          <div className='mt-1 small-medium'>
            Last Reading{': '}
            <span className='body-bold'>{`${getConvertedWeightString(
              last_reading,
              'oz-lboz'
            )}`}</span>
            {/* {`Last Reading: ${last_reading} ${product.weight_unit}`} */}
          </div>
          <div className='mt-1 small-medium'>
            {`Updated At: ${getDateTimeString(
              new Date(last_reading_datetime)
            )}`}
          </div>
        </div>
        <div className='mt-3.5'>{`Location: ${location.location_name}, Fixture: ${location.fixture_no}, Row: ${location.row}`}</div>
      </Link>
    </div>
  );
};

export default ScaleCardCompact;
