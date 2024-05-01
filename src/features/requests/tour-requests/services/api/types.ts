import { APIResponse } from "types/APIResponse";
import { TourRequest } from "features/requests/tour-requests/types";

export interface TourRequestsResponse extends APIResponse<TourRequest> {}

export interface GetTourRequestsReturn
  extends Omit<TourRequestsResponse, "data"> {
  tourRequests: TourRequest[];
}

export interface ChangeTourRequestStatusResponse {
  data: Omit<TourRequest, "property" | "user">;
}

export interface ChangeTourRequestStatusReturn {
  tourRequest: Omit<TourRequest, "property" | "user">;
}
