import { HTMLProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends HTMLProps<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  label?: string;
  [key: string]: any;
}

function Input({ register, label = '', ...props }: Props) {
  return (
    <label>
      {label}
      <input
        {...register}
        {...props}
        className='w-full my-1 p-2 rounded-md outline-blue-400 border-gray-200 border-[1px]'
      />
    </label>
  );
}

export default Input;
