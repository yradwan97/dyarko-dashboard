import { axiosInstance as axiosClient } from "services/axiosInstance";
import { likesUrl } from "features/videos/likes/services/urls";
import { VideoResponse } from "features/videos/services/api/types";
import { GetVideoResponse } from "features/videos/services/api/videosService";

export type CreateVideoLike = (videoId: string) => Promise<GetVideoResponse>;

export type DeleteVideoLike = (videoId: string) => Promise<GetVideoResponse>;
export const createVideoLike: CreateVideoLike = async (videoId) => {
  const { data: res } = await axiosClient.post<VideoResponse>(
    likesUrl.VIDEO_LIKE(videoId)
  );
  return { video: res.data };
};

export const deleteVideoLike: DeleteVideoLike = async (videoId) => {
  const { data: res } = await axiosClient.delete<VideoResponse>(
    likesUrl.VIDEO_LIKE(videoId)
  );
  return { video: res.data };
};
