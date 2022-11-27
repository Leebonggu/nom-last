import type { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';

type Params = {
  id: string | string[];
};
interface Props {
  params?: Params;
}
const TweetDetail: NextPage = ({ params }: Props) => {
  const { data } = useSWR(`/api/tweets/${params?.id}`);
  console.log(data);
  return <div>Detail</div>;
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
