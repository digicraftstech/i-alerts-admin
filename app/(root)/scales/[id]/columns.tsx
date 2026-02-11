'use client';

import { Button } from '@/components/ui/button';
import { getExactTimeDifference } from '@/lib/utils';
import { Reading, Reading } from '@/types/global';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const readingColumns: ColumnDef<Reading>[] = [
  {
    accessorKey: 'record_id',
    header: 'ID',
  },
  {
    accessorKey: 'weight_reading',
    header: 'Weight Reading',
  },
  {
    accessorKey: 'reading_datetime',
    header: 'Recorded At',
    cell: ({ row }) => {
      const dateString = row.getValue('reading_datetime') as string;
      const formattedDate = new Date(dateString);
      return (
        <div className='text-left font-medium'>
          {formattedDate.toLocaleString()}
        </div>
      );
    },
  },
];

export const notificationColumns: ColumnDef<Notification>[] = [
  {
    accessorKey: 'alert_raised_date',
    // header: 'Date',
    cell: ({ row }) => {
      const dateString = row.getValue('alert_raised_datetime') as string;
      const formattedDate = new Date(dateString).toDateString();
      return (
        <div className='text-left font-medium'>
          {formattedDate.toLocaleString()}
        </div>
      );
    },
    header: 'Date',
  },
  {
    accessorKey: 'alert_raised_datetime',
    header: 'Alert Raised At',
    cell: ({ row }) => {
      const dateString = row.getValue('alert_raised_datetime') as string;
      const formattedDate = new Date(dateString).toLocaleTimeString();
      return (
        <div className='text-left font-medium'>
          {formattedDate.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'alert_ack_datetime',
    header: 'Acknowledged At',
    cell: ({ row }) => {
      const rowVal = row.getValue('alert_ack_datetime');

      let value = '-';

      if (rowVal) {
        const dateString = row.getValue('alert_ack_datetime') as string;
        value = new Date(dateString).toLocaleTimeString();
      }

      return <div className='text-left font-medium'>{value}</div>;
    },
  },
  {
    accessorKey: 'alert_addressed_datetime',
    header: 'Addressed At',
    cell: ({ row }) => {
      const rowVal = row.getValue('alert_addressed_datetime');
      let value = '-';
      if (rowVal) {
        const dateString = row.getValue('alert_addressed_datetime') as string;
        value = new Date(dateString).toLocaleTimeString();
      }
      return <div className='text-left font-medium'>{value}</div>;
    },
  },
  {
    accessorKey: '',
    header: 'Time Taken',
    cell: ({ row }) => {
      const rowValFrom = row.getValue('alert_raised_datetime') as string;
      const rowValTo = row.getValue('alert_addressed_datetime') as string;

      let value = '-';
      if (rowValTo && rowValFrom) {
        value = getExactTimeDifference(
          new Date(rowValTo),
          new Date(rowValFrom)
        );
      }

      return <div className='text-left font-medium'>{value}</div>;
    },
  },
];

export const readingsColumns: ColumnDef<Reading>[] = [
  {
    accessorKey: 'reading_datetime',
    header: 'Reading At',
    cell: ({ row }) => {
      const dateString = row.getValue('reading_datetime') as string;
      const formattedDate =
        new Date(dateString).toLocaleDateString() +
        ' ' +
        new Date(dateString).toLocaleTimeString();
      return (
        <div className='text-left font-medium'>
          {formattedDate.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'weight_reading',
    header: 'Weight Reading',
    cell: ({ row }) => {
      console.log(row);
      const rowVal = row.getValue('weight_reading');

      let value = '-';

      if (rowVal) {
        const weight = row.getValue('weight_reading') as string;
        value = weight.toString();
      }

      return <div className='text-left font-medium'>{value}</div>;
    },
  },
];
