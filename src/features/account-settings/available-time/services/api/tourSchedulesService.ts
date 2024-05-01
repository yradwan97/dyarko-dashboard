import { axiosInstance as axios } from "services/axiosInstance";
import {
  GetTourSchedulesResponse,
  GetTourSchedulesReturn,
  PostTourScheduleResponse,
  PostTourScheduleReturn,
  TourSchedule,
  tourScheduleMapper,
  TourSchedulesFilter,
  tourSchedulesUrls,
} from "features/account-settings";

export const getTourSchedules = async (
  filter: TourSchedulesFilter,
  userId: string
): Promise<GetTourSchedulesReturn> => {
  const { data: res } = await axios.get<GetTourSchedulesResponse>(
    tourSchedulesUrls.GET_ALL(userId),
    {
      params: filter,
    }
  );

  const tourSchedules = res.data.map(tourScheduleMapper.toTourSchedule);

  return {
    tourSchedules,
    message: res.message,
    size: res.size,
    pages: res.pages,
    itemsCount: res.itemsCount,
  };
};

export const postTourSchedule = async (
  tourSchedule: Omit<TourSchedule, "id">
): Promise<PostTourScheduleReturn> => {
  const serverTourSchedule =
    tourScheduleMapper.toServerTourSchedule(tourSchedule);
  const { data: res } = await axios.post<PostTourScheduleResponse>(
    tourSchedulesUrls.POST,
    serverTourSchedule
  );

  const createdTourSchedule = tourScheduleMapper.toTourSchedule(res.data);

  return {
    tourSchedule: createdTourSchedule,
    message: res.message,
  };
};
