export interface VideosUrl {
  ALL_VIDEOS: string;
  VIDEO_BY_ID: (id: string) => string;
  VIDEO_LIKE: (id: string) => string;
  CREATE_VIDEO: string;
}

const BASE_URL = "/videos";

export const videosUrls: VideosUrl = {
  ALL_VIDEOS: `${BASE_URL}`,
  VIDEO_BY_ID: (id) => `${BASE_URL}/${id}`,
  VIDEO_LIKE: (id) => `${BASE_URL}/${id}/likes`,
  CREATE_VIDEO: BASE_URL,
};
