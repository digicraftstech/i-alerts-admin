'use client';

import { useEffect, useState } from 'react';

import { DataTable } from './data-table';
import { readingsColumns } from './columns';
import { Reading } from '@/types/global';

interface ReadingsTableProps {
  scaleId: string;
  intervalMs?: number;
}

const ReadingsTable = ({ scaleId, intervalMs = 30000 }: ReadingsTableProps) => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchReadings = async () => {
      try {
        const res = await fetch(`/api/scales/${scaleId}/readings`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!res.ok) {
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }

        const data = await res.json();

        if (isMounted) {
          setReadings(data.data ?? []);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchReadings();
    const intervalId = window.setInterval(fetchReadings, intervalMs);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [scaleId, intervalMs]);

  if (isLoading) {
    return (
      <div className='rounded-md border p-6 text-center text-sm text-dark400_light700'>
        Loading readings...
      </div>
    );
  }

  return <DataTable data={readings} columns={readingsColumns} />;
};

export default ReadingsTable;
