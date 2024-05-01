interface TourRequestsUrls {
  GET_ALL: string;
  CHANGE_STATUS: (tourId: string) => string;
}

const BASE_URL = "/tours";
export const tourRequestsUrls: TourRequestsUrls = {
  GET_ALL: BASE_URL,
  CHANGE_STATUS: (tourId) => `${BASE_URL}/status/${tourId}`,
};
