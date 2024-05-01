import { useQuery } from "@tanstack/react-query";
import { GetBuyablePlansReturn, getPlans } from "features/plans";

export const PLANS_KEY = "plans";

export const useGetPlans = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetBuyablePlansReturn,
    Error
  >({
    queryKey: [PLANS_KEY],
    queryFn: () => getPlans(),
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
