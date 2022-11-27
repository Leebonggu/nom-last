import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T, K> = [(data: T) => void, UseMutationState<K>];

function useMutation<T extends any, K extends any>(url: string): UseMutationResult<T, K> {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: T) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) => setState((prev) => ({ ...prev, error, loading: false })));
  }

  return [mutation, state];
}

export default useMutation;
