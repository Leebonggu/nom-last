import { Post, User } from '@prisma/client';
import type { NextPage } from 'next';
import useSWR from 'swr';
import PlusIcon from '../assets/PlusIcon';
import Card from '../components/atom/Card';
import CircleIcon from '../components/atom/CircleIcon';
import Empty from '../components/Empty';
import useUser from '../lib/useUser';

type CustomPost = Post & {
  user: User;
  _count: { likes: number };
};

interface TweetsResponse {
  posts: CustomPost[];
}

const Home: NextPage = () => {
  const { isLoading } = useUser();
  const { data, error } = useSWR<TweetsResponse>('/api/tweets');

  if (isLoading || (!data && !error)) return <div>loading...</div>;

  return (
    <div className='px-2 py-4 h-full overflow-scroll relative'>
      <div className='flex flex-col gap-5'>
        {data?.posts ? (
          data?.posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              createUser={post.user.name}
              post={post.post}
              createdAt={String(post.createdAt).split('T')[0]}
              likes={post._count.likes}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>
      <CircleIcon url='/tweets/write' icon={<PlusIcon />} />
    </div>
  );
};

export default Home;
