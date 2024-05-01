import { TourSchedulesFilter } from "features/account-settings/available-time/types";
import { defaultFilter } from "configs/defaultFilter";
import { useQuery } from "@tanstack/react-query";
import {
  getTourSchedules,
  GetTourSchedulesReturn,
} from "features/account-settings";
import { toastifyClient } from "services/toastifyClient";
import { useAppSelector } from "hooks";
import { selectUser } from "store/auth";
import { User } from "features/users";

export const TOUR_SCHEDULES_KEY = "tour_schedules";

export interface UseGetTourSchedules {
  filter: TourSchedulesFilter;
}

export const useGetTourSchedules = ({
  filter = defaultFilter,
}: UseGetTourSchedules) => {
  const user: User = useAppSelector(selectUser);
  const userId = user?.id;
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetTourSchedulesReturn,
    Error
  >({
    queryKey: [TOUR_SCHEDULES_KEY, filter.page],
    queryFn: async () => await getTourSchedules(filter, userId),
    onError: (err) => {
      toastifyClient.error({ message: err.message });
    },
    enabled: !!userId,
  });

  return {
    tourSchedules: data?.tourSchedules,
    itemsCount: data?.itemsCount,
    pagesCount: data?.pages,
    size: data?.size,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
