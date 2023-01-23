import axios from "axios";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex, previousPageData) => {
  pageIndex = pageIndex + 1;
  if (previousPageData && !previousPageData.length) return null;
  return `https://api.thecatapi.com/v1/breeds?page=${pageIndex}&limit=10`; // SWR key
};
// https://api-pink-city.proseller-demo.com/product/api/productpreset/loaditems/webOrdering/2d78d587-c36d-4083-86ec-96878d5cca6c/e73e0f7c-9aa3-4623-a2d7-e3503a2f9656?page=${pageIndex}

// https://api.thecatapi.com/v1/breeds?page=${pageIndex}&limit=10
export const useCat = () => {
  const fetcher = (url) =>
    axios
      .get(url)
      .then((res) => res.data);
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  return {
    cat: data,
    isLoading: !error && !data,
    isError: error,
    size: size,
    setSize: setSize,
  };
};
