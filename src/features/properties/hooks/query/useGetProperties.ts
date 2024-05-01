import { useQuery } from "@tanstack/react-query";
import {
  getProperties,
  GetPropertiesReturn,
  PROPERTIES_KEY,
  PropertiesFilter,
} from "features/properties";
import { useAppSelector } from "hooks";

export const useGetProperties = (filter: PropertiesFilter) => {
  const auth: Record<string, any> = useAppSelector(state => state.auth);
  const userId = auth.user?._id;
  const newFilter = {
    ...filter,
    owner: userId,
  };
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetPropertiesReturn,
    Error
  >({
    queryKey: [PROPERTIES_KEY, { ...filter }],
    queryFn: () => getProperties(newFilter),
    enabled: !!userId,
    refetchOnWindowFocus: false
  });
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useGetProperties;
