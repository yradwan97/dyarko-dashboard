import { useMutation } from "@tanstack/react-query";
import { postTourSchedule } from "features/account-settings/available-time/services/api/tourSchedulesService";
import { TourSchedule } from "features/account-settings/available-time/types";
import { toastifyClient } from "services/toastifyClient";
import { PostTourScheduleReturn } from "features/account-settings/available-time/services/api/types";
import { useRef } from "react";
import { Id as ToastifyId } from "react-toastify";
import { queryClient } from "services/queryClient";
import { TOUR_SCHEDULES_KEY } from "features/account-settings/available-time/hooks/query/useGetTourSchedules";

export const useMutateTourSchedule = () => {
  const toastId = useRef<ToastifyId | null>(null);

  const createTourScheduleMutation = useMutation<
    PostTourScheduleReturn,
    Error,
    Omit<TourSchedule, "id">
  >({
    mutationFn: postTourSchedule,
    onMutate: () => {
      toastId.current = toastifyClient.loading({ message: "Pending..." });
    },
    onError: (error: Error) => {
      toastId.current &&
        toastifyClient.error({ id: toastId.current, message: error.message });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TOUR_SCHEDULES_KEY] });
      toastId.current &&
        toastifyClient.success({
          id: toastId.current,
          message: "Tour schedule created successfully",
        });
    },
  });

  const createTourSchedule = (tourSchedule: Omit<TourSchedule, "id">) => {
    createTourScheduleMutation.mutate(tourSchedule);
  };

  return {
    createTourSchedule,
  };
};
