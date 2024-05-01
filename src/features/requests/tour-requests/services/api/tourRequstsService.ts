import { axiosInstance as axios } from "services/axiosInstance";
import { tourRequestsUrls } from "features/requests/tour-requests/services/api/urls";
import {
  ChangeTourRequestStatusResponse,
  ChangeTourRequestStatusReturn,
  GetTourRequestsReturn,
  TourRequestsFilter,
  TourRequestsResponse,
} from "features/requests/tour-requests/index";

import { RequestStatus } from "features/requests";

export const getTourRequests = async (
  filter: TourRequestsFilter
): Promise<GetTourRequestsReturn> => {
  const { data: res } = await axios.get<TourRequestsResponse>(
    tourRequestsUrls.GET_ALL,
    {
      params: filter,
    }
  );

  return {
    tourRequests: res.data,
    message: res.message,
    itemsCount: res.itemsCount,
    pages: res.pages,
    size: res.size,
  };
};

export const updateTourRequestStatus = async (
  tourRequestId: string,
  status: RequestStatus
): Promise<ChangeTourRequestStatusReturn> => {
  const { data: res } = await axios.put<ChangeTourRequestStatusResponse>(
    tourRequestsUrls.CHANGE_STATUS(tourRequestId),
    {
      status,
    }
  );

  return {
    tourRequest: res.data,
  };
};
