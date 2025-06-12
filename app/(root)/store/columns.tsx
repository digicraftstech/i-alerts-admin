'use client';

import { Device } from '@/types/global';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const deviceColumns: ColumnDef<Device>[] = [
  {
    accessorKey: 'device_id',
    header: 'ID',
  },
  {
    accessorKey: 'device_name',
    header: 'Name',
  },
  {
    accessorKey: 'device_uid',
    header: 'Device UID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Added   At',
    cell: ({ row }) => {
      const dateString = row.getValue('createdAt') as string;
      const formattedDate = new Date(dateString);
      return (
        <div className='text-left font-medium'>
          {formattedDate.toLocaleString()}
        </div>
      );
    },
  },
];
