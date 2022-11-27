import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className=''>404 - Page Not Found</h1>
      <div className='text-blue-400'>
        <Link href={'/'}>Home</Link>
      </div>
    </div>
  );
}
