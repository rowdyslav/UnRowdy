import {useEffect, useState} from "react";

interface UseAsyncDataParams<T> {
  fetcher: () => Promise<T>;
  enabled?: boolean;
  initialData: T;
}

interface UseAsyncDataReturn<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export const useAsyncData = <T>({
  fetcher,
  enabled = true,
  initialData,
}: UseAsyncDataParams<T>): UseAsyncDataReturn<T> => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setError(null);
      setData(initialData);
      return;
    }

    let isActive = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const nextData = await fetcher();

        if (isActive) {
          setData(nextData);
        }
      } catch (error) {
        if (isActive) {
          setError(error instanceof Error ? error.message : "Unexpected request error");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isActive = false;
    };
  }, [enabled, fetcher, initialData]);

  return {data, isLoading, error};
};
