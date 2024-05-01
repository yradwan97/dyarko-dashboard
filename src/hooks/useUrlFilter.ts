import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toParams } from "utils/queryParams";

export interface UseUrlResponse<T> {
  urlParams: T;
  setUrlParams: (newFilter: T) => void;
  isLoading: boolean;
}

const useUrlFilter = <T>(
  validKeys: Iterable<string> = []
): UseUrlResponse<T> => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const setParams = (newFilter: T) => {
    return setSearchParams(toParams(newFilter));
  };

  useEffect(() => {
    const urlInitFilter: Record<string, any> = {};
    const keySet = new Set(validKeys);
    searchParams.forEach((value, key) => {
      if (keySet.has(key)) {
        urlInitFilter[key] = value;
      }
    });
    setParams(urlInitFilter as T);
    setLoading(false);
  }, []);

  return {
    urlParams: Object.fromEntries(searchParams) as T,
    setUrlParams: setParams,
    isLoading: loading,
  };
};

export default useUrlFilter;
