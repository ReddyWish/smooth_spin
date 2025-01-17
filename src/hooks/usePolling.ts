import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function usePolling(searchParam: string | null, ms: number = 60000) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Interval Running');
      if (!searchParam) {
        console.log('refreshing data');
        router.refresh();
      }
    }, ms);

    return () => clearTimeout(intervalId);
  }, [searchParam, ms]);
}
