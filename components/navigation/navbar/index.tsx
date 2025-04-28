import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import MobileNavigation from './MobileNavigation';

const Navbar = () => {
  return (
    <nav className='flex-between w-full z-50 background-light900_dark200 p-6 fixed gap-5 shadow-light-300 dark:shadow-none sm:px-12'>
      <Link href='/' className='flex items-center gap-3'>
        <Image
          src='/images/site-logo.png'
          alt='iAlerts Logo'
          height={32}
          width={32}
        />
        <p className='h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
          iAlerts<span className='text-primary-500'>Insights</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className='flex-between gap-5'>
        <ThemeSwitcher />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
