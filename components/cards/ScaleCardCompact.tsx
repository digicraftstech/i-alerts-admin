'use client';

import { getConvertedWeightString } from '@/lib/conversions';
import { getDateTimeString } from '@/lib/utils';
import { Scale } from '@/types/global';
import { Delete, MapPin, Power, RotateCcwSquare, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Edit, Weight } from 'lucide-react';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { toast } from 'sonner';

import React, { useState } from 'react';

interface ScaleCardProps {
  scale: Scale;
}

const ScaleCardCompact = ({
  scale: {
    ss_id,
    ss_unique_name,
    last_reading,
    last_reading_datetime,
    // alert,
    status,
    placement,
    location,
  },
}: ScaleCardProps) => {
  let scaleStatus = 'regular';
  if (!location || !placement) {
    scaleStatus = 'unassigned';
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
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isTaring, setIsTaring] = useState(false);

  const handleCalibrate = async () => {
    if (!ss_id || isCalibrating) return;

    setIsCalibrating(true);

    try {
      const res = await fetch(`/api/scales/${10}/calibrate`, {
        method: 'PUT',
      });
      if (res.ok) {
        toast.info('Calibration started.');
      } else {
        if (res.status === 404) toast.error('Scale not found.');
        else toast.error('Failed to send calibrate command to scale.');
      }
    } catch (error) {
      toast.error('Failed to send calibrate command to scale.');
    } finally {
      setIsCalibrating(false);
    }
  };

  const handleRestart = async () => {
    if (!ss_id || isRestarting) return;

    setIsRestarting(true);

    try {
      const res = await fetch(`/api/scales/${ss_id}/restart`, {
        method: 'PUT',
      });
      if (res.ok) {
        toast.info('Restart started.');
      } else {
        if (res.status === 404) toast.error('Scale not found.');
        else toast.error('Failed to send restart command to scale.');
      }
    } catch (error) {
      toast.error('Failed to send restart command to scale.');
    } finally {
      setIsRestarting(false);
    }
  };

  const handleTare = async () => {
    if (!ss_id || isTaring) return;

    setIsTaring(true);

    try {
      const res = await fetch(`/api/scales/${ss_id}/tare`, {
        method: 'PUT',
      });
      if (res.ok) {
        toast.info('Tare started.');
      } else {
        if (res.status === 404) toast.error('Scale not found.');
        else toast.error('Failed to send tare command to scale.');
      }
    } catch (error) {
      toast.error('Failed to send tare command to scale.');
    } finally {
      setIsTaring(false);
    }
  };

  return (
    <div
      className={`card-wrapper rounded-[10px] min-w-[300px] p-9 sm:px-11 ${bgColor}`}
    >
      {/* <Link href={ROUTES.SCALE(ss_id)}> */}
      <div className='flex flex-row justify-between'>
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
        <div className='flex flex-row gap-2'>
          <Button variant='outline' size='icon' asChild>
            <Link href={ROUTES.SCALE(ss_id)} title='Edit'>
              <Trash className='absolute h-[1.2rem] w-[1.2rem]' />
            </Link>
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={handleCalibrate}
            title='Calibrate'
            disabled={isCalibrating}
          >
            <Weight className='absolute h-[1.2rem] w-[1.2rem]' />
          </Button>

          <Button
            variant='outline'
            size='icon'
            onClick={handleTare}
            title='Tare'
            disabled={isTaring}
          >
            <RotateCcwSquare className='absolute h-[1.2rem] w-[1.2rem]' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={handleRestart}
            title='Restart'
            disabled={isRestarting}
          >
            <Power className='absolute h-[1.2rem] w-[1.2rem]' />
          </Button>
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

      <div className='mt-3.5 flex flex-row items-center gap-1'>
        <MapPin
          name='location-on'
          size={15}
          // color={Colors.LOCATION_PIN}
        />
        {location
          ? `Fixture: ${location.fixture_no}, Row: ${location.row}`
          : 'Location not assigned'}
      </div>
      {/* </Link> */}
    </div>
  );
};

export default ScaleCardCompact;
