import React from 'react';
import NavLinks from './navbar/NavLinks';

// import ROUTES from '@/constants/routes';
// import Link from 'next/link';
// import { Button } from '../ui/button';
// import Image from 'next/image';

const LeftSideBar = () => {
  return (
    // <section className='custom-scrollbar background-light800_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
    <section className='custom-scrollbar bg-primary-background light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-30 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
      <div className='flex flex-1 flex-col gap-6'>
        <NavLinks />
      </div>
    </section>
  );
};

export default LeftSideBar;
