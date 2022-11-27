import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
  redirect?: {
    url: string;
    text: string;
  };
  errorMsg?: string;
}

function FormContainer({ children, title, redirect, errorMsg }: Props) {
  return (
    <div className='py-5 px-2'>
      <h2 className='text-xl py-2 font-bold'>{title}</h2>
      {children}
      <div className='text-red-500 font-semibold p-2'>{errorMsg}</div>
      {redirect && (
        <div className='pt-2 px-2 text-blue-400 flex justify-center'>
          <Link href={redirect.url}>{redirect.text}</Link>
        </div>
      )}
    </div>
  );
}

export default FormContainer;
