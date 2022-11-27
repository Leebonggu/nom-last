import React from 'react';

interface Props {
  title: string;
}
function Button({ title }: Props) {
  return (
    <button className='w-full px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-500 active:shadow-lg transition duration-150 ease-in-out'>
      {title}
    </button>
  );
}

export default Button;
