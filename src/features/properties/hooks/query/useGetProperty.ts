import { useQuery } from "@tanstack/react-query";
import { getProperty, GetPropertyReturn } from "features/properties";

export const PROPERTIES_KEY = "properties";

export const useGetProperty = (propertyId: string) => {
  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery<
    GetPropertyReturn,
    Error
  >({
    queryKey: [PROPERTIES_KEY, propertyId],
    queryFn: () => getProperty(propertyId),
  });
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  };
};
