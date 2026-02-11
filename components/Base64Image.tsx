'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toBase64 } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import React from 'react';

type Base64ImageProps = {
  value: string;
  defaultImagePath: string;
  onChange?: (value?: string) => void;
  buttonStyle?: string;
  editable?: boolean;
};

export function Base64Image({
  value,
  defaultImagePath,
  onChange,
  editable = true,
}: Base64ImageProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resolvedSrc = React.useMemo(() => {
    if (!value) {
      return defaultImagePath;
    }

    const trimmed = value.trim();
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') {
      return defaultImagePath;
    }

    if (
      trimmed.startsWith('data:') ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/')
    ) {
      return trimmed;
    }

    return defaultImagePath;
  }, [value, defaultImagePath]);

  const clearInput = () => {
    onChange?.(defaultImagePath);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = (await toBase64(file)) as string;
      onChange?.(base64);
    }
  };

  return (
    <div className='w-20 h-20 flex flex-row items-center justify-between gap-5'>
      {editable && (
        <div className='flex flex-col gap-2 '>
          <Button
            variant='outline'
            // size='icon'
            className={`p-1 w-[100px]`}
            onClick={(e) => {
              e.preventDefault();
              inputRef.current?.click();
            }}
          >
            Edit
            {/* <PencilIcon className='w-4 h-4 text-white' /> */}
          </Button>
          <Button
            variant='outline'
            // size='icon'
            className={` p-1 w-[100px]`}
            onClick={(e) => {
              e.preventDefault();
              // inputRef.current?.setAttribute('value', './images/placeholder.png');
              clearInput();
            }}
          >
            <Trash2Icon className='w-4 h-4 ' />
          </Button>
        </div>
      )}

      <img
        src={resolvedSrc}
        alt='product'
        className='w-20 h-20 object-contain'
        onError={(event) => {
          const target = event.currentTarget;
          if (target.src !== defaultImagePath) {
            target.src = defaultImagePath;
          }
        }}
      />

      {/* <Avatar className='w-full h-full'>
        <AvatarImage src={value} className='object-cover' />
        <AvatarFallback className='bg-secondary'>
          <User2Icon className='w-16 h-16' />
        </AvatarFallback>
      </Avatar> */}

      <Input
        ref={inputRef}
        type='file'
        className='hidden'
        onChange={handleChange}
        accept='image/*'
      />
    </div>
  );
}
