import { getConvertedWeightString } from '@/lib/conversions';
import { getDateTimeString } from '@/lib/utils';
import { Scale } from '@/types/global';

import React from 'react';

interface ScaleCardProps {
  scale: Scale;
}

const ScaleCardCompact = ({
  scale: {
    ss_unique_name,
    last_reading,
    last_reading_datetime,
    alert,
    placement,
    location,
  },
}: ScaleCardProps) => {
  let status = 'regular';
  if (location) {
    if (alert) {
      if (alert.alert_addressed_datetime) status = 'addressed';
      else if (alert.alert_ack_datetime) status = 'acknowledged';
      else if (alert.alert_raised_datetime) status = 'alerted';
      else status = 'regular';
    }
  } else {
    status = 'unlocated';
  }

  const bgColor = `card-background-${status}`;

  return (
    <div
      className={`card-wrapper rounded-[10px] min-w-[300px] p-9 sm:px-11 ${bgColor}`}
    >
      {/* <Link href={ROUTES.SCALE(ss_id)}> */}
      <div>
        <div>
          <span className='small-medium text-dark400_light700 line-clamp-1 flex'>
            {ss_unique_name}
          </span>
          <h3 className='base-semibold'>
            {placement?.product
              ? `${placement?.product.product_plu} ${placement?.product.product_name}`
              : 'Product not assigned'}
          </h3>
        </div>
      </div>

      <div className='mt-2'>
        <div className='mt-1 small-medium'>
          Last Reading{': '}
          {last_reading ? (
            <span className='body-bold'>{`${getConvertedWeightString(
              last_reading,
              'oz-lboz'
            )}`}</span>
          ) : (
            '-'
          )}
          {/* {`Last Reading: ${last_reading} ${product.weight_unit}`} */}
        </div>
        <div className='mt-1 small-medium'>
          Updated At{': '}
          {last_reading_datetime ? (
            <span>
              {`${getDateTimeString(new Date(last_reading_datetime))}`}
            </span>
          ) : (
            '-'
          )}
        </div>
      </div>

      <div className='mt-3.5'>
        {location
          ? `Location: ${location.location_name}, Fixture: ${location.fixture_no}, Row: ${location.row}`
          : 'Location not assigned'}
      </div>
      {/* </Link> */}
    </div>
  );
};

export default ScaleCardCompact;
