import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import React from 'react';

const Home = async () => {
  const session = await auth();
  console.log('Session: ', session);
  return (
    <div>
      <h1 className='h2-bold'>
        {session?.user?.name} Welcome to i-Alert Insights
      </h1>
      <form
        className='pt-[100px] px-10'
        action={async () => {
          'use server';
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button
          className='bg-primary-500 text-primary-foreground'
          type='submit'
        >
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Home;
