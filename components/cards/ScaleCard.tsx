import ROUTES from '@/constants/routes';
import { getDateTimeString } from '@/lib/utils';
import Link from 'next/link';

import React from 'react';
import Metric from '../Metric';
import { getConvertedWeightString } from '@/lib/conversions';
import { Scale } from '@/types/global';

interface ScaleCardProps {
  scale: Scale;
}

const ScaleCard = ({
  scale: {
    ss_id,
    ss_unique_name,
    last_reading,
    last_reading_datetime,
    threshold_weight,
    allocation_weight,
    location,
    // product,
    placement,
    alert,
    status,
  },
}: ScaleCardProps) => {
  let scaleStatus = 'regular';
  if (!location) {
    scaleStatus = 'unlocated';
  } else {
    scaleStatus = status;
  }

  // let status = 'regular';
  // if (location) {
  //   if (alert) {
  //     if (alert.alert_addressed_datetime) status = 'addressed';
  //     else if (alert.alert_ack_datetime) status = 'acknowledged';
  //     else if (alert.alert_raised_datetime) status = 'alerted';
  //     else status = 'regular';
  //   }
  // } else {
  //   status = 'unlocated';
  // }
  const bgColor = `card-background-${scaleStatus}`;
  // console.log('bgColor: ', bgColor);

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
            <h3 className='base-semibold'>
              {location
                ? placement?.product
                  ? `${placement?.product.product_plu || '-'} ${
                      placement?.product.product_name || '-'
                    }`
                  : 'Product not assigned.'
                : 'Location not assigned'}
              {/* {product
                ? `${product?.product_plu || '-'} ${
                    product?.product_name || '-'
                  }`
                : 'Product not assigned.'} */}
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
        {placement?.product && (
          <div className='mt-3.5'>
            <div className='mt-1 '>
              <Metric
                value={getConvertedWeightString(allocation_weight, 'oz-lboz')}
                title='Allocation Weight: '
                textStyles='small-medium text-dark400_light800'
              />
            </div>
            <div className='mt-1 '>
              <Metric
                value={getConvertedWeightString(threshold_weight, 'oz-lboz')}
                title='Threshold Weight: '
                textStyles='small-medium text-dark400_light800'
              />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ScaleCard;
