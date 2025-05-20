import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
// import ROUTES from '@/constants/routes';
// import { Button } from '@/components/ui/button';
import NavLinks from './NavLinks';

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/icons/hamburger.svg'
          alt='Menu'
          width={36}
          height={36}
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='background-light900_dark200 border-none'
      >
        <SheetHeader>
          <SheetTitle className='hidden'>Navigation</SheetTitle>
          <Link href='/' className='flex items-center gap-3'>
            <Image
              src='/images/intelera-logo.png'
              alt='Logo'
              width={23}
              height={23}
            />
            <p className='h2-bold font-space-grotesk text-dark-100 dark:text-light-900'>
              iAlerts<span className='text-primary-500'>Insights</span>
            </p>
          </Link>
          <div className='no-scrollbar flex h-[calc(100vh-120px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-6 pt-16'>
                <NavLinks isMobileNav />
              </section>
            </SheetClose>
            {/* <div className='flex flex-col gap-3'>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button className='small-medium btn-secondary min-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                    <span className='primary-text-gradient'>Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_UP}>
                  <Button className='small-medium light-border-2 border btn-tertiary text-dark400_light900 min-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div> */}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
