import { APIResponse } from "types/APIResponse";
import { TourSchedule } from "features/account-settings/available-time/types";

export interface ServerTourSchedule {
  _id: string;
  from: string;
  to: string;
}

export interface GetTourSchedulesResponse
  extends APIResponse<ServerTourSchedule> {}

export interface GetTourSchedulesReturn
  extends Omit<GetTourSchedulesResponse, "data"> {
  tourSchedules: TourSchedule[];
}

export interface PostTourScheduleResponse {
  data: ServerTourSchedule;
  message: string;
}

export interface PostTourScheduleReturn {
  tourSchedule: TourSchedule;
  message: string;
}
