import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className='max-w-2xl h-screen mx-auto relative'>
      <Header />
      <div className='bg-neutral-50 pt-16 h-full'>{children}</div>
    </div>
  );
}

export default Layout;
