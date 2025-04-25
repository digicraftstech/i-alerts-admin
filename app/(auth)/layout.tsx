import SocialAuthForm from '@/components/forms/SocialAuthForm';
import Image from 'next/image';
import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-auth-image bg-cover bg-center bg-no-repeat px-4 py-10'>
      <section className='min-w-full px-4 py-10 border light-border rounded-[10px] background-light800_dark200 shadow-light100_dark100 shadow-md sm:min-w-[520px] sm:px-8'>
        <div className='flex items-center justify-between gap 2'>
          <div className='space-y-2.5'>
            <h1 className='h2-bold text-dark100-ligth900'>
              Join iAlert Insights
            </h1>
            <p className='paragraph-regular text-dark500_light400'>
              Manage your fresh produce stock in realtime.
            </p>
          </div>
          <Image
            src='/images/site-logo.png'
            alt='iAlert Logo'
            width={50}
            height={50}
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
