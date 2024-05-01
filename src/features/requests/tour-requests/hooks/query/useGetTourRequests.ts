import { TourRequestsFilter } from "features/requests/tour-requests/types";
import { GetTourRequestsReturn } from "features/requests/tour-requests/services/api/types";
import { useQuery } from "@tanstack/react-query";
import { getTourRequests } from "features/requests/tour-requests/services/api/tourRequstsService";

export const TOUR_REQUESTS_KEY = "tour_requests";

export interface UseGetTourRequestsProps {
  filter: TourRequestsFilter;
}

export const useGetTourRequests = ({ filter }: UseGetTourRequestsProps) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetTourRequestsReturn,
    Error
  >({
    queryKey: [TOUR_REQUESTS_KEY, filter.page],
    queryFn: async () => await getTourRequests(filter),
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
