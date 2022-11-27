import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
  url: string;
  icon?: ReactNode;
}

function CircleIcon({ url, icon }: Props) {
  return (
    <Link href={url}>
      <div className='cursor-pointer w-14 h-14 rounded-full border-[1px] absolute bottom-10 right-4 flex justify-center items-center bg-blue-300 shadow-md'>
        {icon ?? 'icon'}
      </div>
    </Link>
  );
}

export default CircleIcon;
