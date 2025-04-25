'use client';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import ROUTES from '@/constants/routes';

const SocialAuthForm = () => {
  const handleSignIn = async (provider: 'google') => {
    console.log('Signing in via: ', provider);
    try {
      // throw new Error(`${provider} - sign in Not implemented`);
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.log('Error, signing in - ', error);
      toast.error(
        `An error occured while submiting the sign-in request. ${error}`
      );
    }
  };
  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5';
  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
      <Button className={buttonClass} onClick={() => handleSignIn('google')}>
        <Image
          src='/icons/google.svg'
          alt='Google Logo'
          width={20}
          height={20}
          className='mr-2.5 object-contain'
        />
        <span>Log In with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
