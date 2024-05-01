import { useMutation } from "@tanstack/react-query";
import {
  ChangeTourRequestStatusReturn,
  TOUR_REQUESTS_KEY,
  TourRequest,
  updateTourRequestStatus,
} from "features/requests/tour-requests";
import { toastifyClient } from "services/toastifyClient";
import { queryClient } from "services/queryClient";
import { RequestStatus } from "features/requests";

const useMutateTourRequest = () => {
  const changeTourRequestStatusMutation = useMutation<
    ChangeTourRequestStatusReturn,
    Error,
    Pick<TourRequest, "status" | "_id">
  >({
    mutationFn: ({ _id, status }) => updateTourRequestStatus(_id, status),
    onSuccess: async (tourRequest) => {
      await queryClient.invalidateQueries({ queryKey: [TOUR_REQUESTS_KEY] });
    },
    onError: (error) => {
      toastifyClient.error({ message: error?.message ?? "" });
    },
  });

  const changeTourRequestStatus = (
    tourRequestId: string,
    status: RequestStatus
  ) => {
    return changeTourRequestStatusMutation.mutate({
      _id: tourRequestId,
      status,
    });
  };

  return { changeTourRequestStatus };
};

export default useMutateTourRequest;
