import LeftSideBar from '@/components/navigation/LeftSideBar';
import Navbar from '@/components/navigation/navbar';
import React, { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <main className='background-light850_dark100 relative'>
    <main className='bg-bar-background relative'>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <section className='background-light500_dark200 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-30 max-md:pb-14 sm:px-14'>
          <div className='w-full max-w-5xl'>{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
