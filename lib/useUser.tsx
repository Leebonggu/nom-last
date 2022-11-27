import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

function useUser() {
  const { data, error } = useSWR('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/log-in');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !error && !data, isError: error };
}

export default useUser;
