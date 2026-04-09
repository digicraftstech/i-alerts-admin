import { getDateTimeString } from '@/lib/utils';
import Link from 'next/link';

import React from 'react';
import Indicator from '../Indicator';
import Metric from '../Metric';
import { getConvertedWeightString } from '@/lib/conversions';
import { Scale } from '@/types/global';
import { ROUTES } from '@/constants';

interface ScaleCardProps {
  scale: Scale;
}

const ScaleCard = ({
  scale: {
    ss_id,
    ss_unique_name,
    last_reading,
    last_reading_datetime,
    location,
    battery_level,
    rssi_level,
    placement,
    status,
    // alert,
    // product,
  },
}: ScaleCardProps) => {
  let scaleStatus = 'regular';
  if (!location || !placement) {
    scaleStatus = 'unassigned';
  } else {
    if (status) scaleStatus = status;
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
    <Link href={ROUTES.SCALE(ss_id)}>
      <div
        className={`card-wrapper rounded-[10px] min-w-[300px] min-h-[200px] p-9 sm:px-11 ${bgColor}`}
      >
        <div className='flex items-start justify-between gap-4'>
          <div className='w-full'>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
              <span className='subtle-regular text-dark400_light700 line-clamp-1 min-w-0 flex-1'>
                {ss_unique_name}
              </span>
              <div className='flex shrink-0 flex-row items-end gap-2'>
                <Indicator type='signal' level={rssi_level} />
                <Indicator type='battery' level={battery_level} />
              </div>
            </div>
            <h3 className='base-semibold'>
              {location
                ? placement?.product
                  ? `${placement?.product.product_plu || '-'} ${
                      placement?.product.product_name || '-'
                    }`
                  : 'Product not assigned.'
                : 'Location not assigned'}
            </h3>
          </div>
        </div>

        <div className='mt-2'>
          <div className='mt-1 small-medium'>
            Last Reading{': '}
            {last_reading ? (
              <span className='body-bold'>{`${getConvertedWeightString(
                last_reading,
                placement?.weight_unit === 'lbs' ? 'gm-lb' : 'gm-kg'
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
        {/* {placement?.product && ( */}
        <div className='mt-3.5'>
          <div className='mt-1 '>
            <Metric
              value={getConvertedWeightString(
                placement?.allocation_weight ?? 0,
                placement?.weight_unit === 'lbs' ? 'gm-lb' : 'gm-kg'
              )}
              title='Allocation Weight: '
              textStyles='small-medium text-dark400_light800'
            />
          </div>
          <div className='mt-1 '>
            <Metric
              value={getConvertedWeightString(
                placement?.threshold_weight ?? 0,
                placement?.weight_unit === 'lbs' ? 'gm-lb' : 'gm-kg'
              )}
              title='Threshold Weight: '
              textStyles='small-medium text-dark400_light800'
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </Link>
  );
};

export default ScaleCard;
