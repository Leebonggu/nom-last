import Link from 'next/link';
import HeartIcon from '../../assets/HeartIcon';

interface Props {
  id: number;
  createUser: string | null;
  post: string;
  createdAt: any;
  likes: number;
  isLiked: boolean;
}

function Card({ id, createUser, post, createdAt, likes, isLiked }: Props) {
  return (
    <div className='w-full  h-40 p-5 shadow-sm border-gray-300 bg-white rounded-lg flex flex-col'>
      <div className='w-full flex-[2] flex items-center gap-4'>
        <div
          className={`w-12 h-12 bg-blue-300 rounded-full flex justify-center items-center text-white text-2xl`}
        >
          <span>{createUser?.at(1)?.toUpperCase()}</span>
        </div>
        <div>{createUser}</div>
      </div>
      <Link href={`/tweets/${id}`}>
        <a className='flex-[4] py-2 w-full break-words'>
          <div>{post.length > 60 ? `${post.slice(0, 60)} ...` : post}</div>
        </a>
      </Link>
      <div className='flex-[1] flex justify-between text-sm text-gray-400'>
        <div className='text-gray-400'>{createdAt}</div>
        <div className='flex gap-2'>
          <div
            className={`w-5 h-5 ${isLiked ? 'text-red-400' : 'text-gray-400'}`}
          >
            <HeartIcon />
          </div>
          {likes}
        </div>
      </div>
    </div>
  );
}

export default Card;
