const BASE_URL = "/schedules";

export interface TourSchedulesUrls {
  GET_ALL: (userId: string) => string;
  POST: string;
}

export const tourSchedulesUrls: TourSchedulesUrls = {
  GET_ALL: (userId) => `${BASE_URL}/${userId}`,
  POST: BASE_URL,
};
