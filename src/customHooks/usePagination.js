import useSWR from "swr";
import axios from 'axios'
export const usePagination = (pages, counts) => {
  const fetcher = (url) => axios(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://reqres.in/api/users?page=${pages}&per_page=${counts}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
