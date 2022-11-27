import type { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';
import HeartIcon from '../../assets/HeartIcon';
import { getRandomBGColor } from '../../lib/randomBGColor';
import useMutation from '../../lib/useMutation';

type Params = {
  id: string | string[];
};
interface Props {
  params?: Params;
}

interface Post {
  createdAt: string;
  updatedAt: string;
  id: number;
  post: string;
  user: {
    name: string;
    email: string;
  };
  userId: number;
  _count: {
    likes: number;
  };
}
interface Response {
  ok: boolean;
  post: Post;
  isLiked: boolean;
}

const TweetDetail: NextPage = ({ params }: Props) => {
  const { data, mutate } = useSWR<Response>(`/api/tweets/${params?.id}`, {
    revalidateOnFocus: false,
  });
  const [like] = useMutation(`/api/tweets/${params?.id}/like`);

  console.log(data);

  if (!data) return <div>loading...</div>;

  const {
    post: { createdAt, user, post },
    isLiked,
  } = data;

  const handleLike = () => {
    like({});

    mutate((prev) => {
      return prev && { ...prev, isLiked: !prev.isLiked };
    }, false);
  };

  console.log(getRandomBGColor());

  return (
    <div className='px-2 py-4 flex flex-col gap-6'>
      <div className='flex flex-col min-h-[400px] bg-white p-4 rounded-lg shadow-md relative'>
        <div>
          <div className='w-full flex-[2] flex items-center gap-4'>
            <div
              className={`w-12 h-12 ${getRandomBGColor()} rounded-full flex justify-center items-center text-white text-2xl`}
            >
              <span>{user.name?.at(1)?.toUpperCase()}</span>
            </div>
            <div className='flex flex-col'>
              <span>{user.name}</span>
              <span className='text-gray-400 text-sm'>
                {createdAt.split('T')[0]}
              </span>
            </div>
          </div>
        </div>
        <div className='py-6'>
          <div>{post}</div>
        </div>
        <div className='absolute w-full bottom-0 right-0 flex justify-end'>
          <div className='flex justify-center items-center gap-1 pr-6 py-4 '>
            <div
              onClick={handleLike}
              className={`w-5 h-5 ${
                isLiked ? 'text-red-400' : 'text-gray-400'
              }`}
            >
              <HeartIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  return {
    props: {
      params,
      query,
    }, // will be passed to the page component as props
  };
};

export default TweetDetail;
