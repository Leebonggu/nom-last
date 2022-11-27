import Link from 'next/link';
import React from 'react';
import LogoIcon from '../assets/LogoIcon';

function Header() {
  return (
    <div className='w-full h-16 absolute bg-blue-300'>
      <div className='relative h-full flex justify-center items-center'>
        <Link href='/'>
          <a className='w-10 h-10'>
            <LogoIcon />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
