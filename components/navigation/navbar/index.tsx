import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import MobileNavigation from './MobileNavigation';

const Navbar = () => {
  return (
    // <nav className='flex-between w-full z-50 background-light800_dark200 p-6 fixed gap-5 shadow-light-300 dark:shadow-none sm:px-8'>
    <nav className='flex-between w-full z-50 bg-primary-background p-6 fixed gap-5 border-b-1 shadow-light-300 dark:shadow-none sm:px-8'>
      <Link href='/' className='flex items-center gap-3'>
        <Image
          src='/images/intelera-logo.png'
          alt='iAlerts Logo'
          height={32}
          width={32}
          className='rounded-sm'
        />
        <p className='h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
          iAlerts<span className='text-app-accent-light'> Insights</span>
        </p>
      </Link>
      {/* <p>Global Search</p> */}
      <div className='flex-between gap-5'>
        <ThemeSwitcher />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
