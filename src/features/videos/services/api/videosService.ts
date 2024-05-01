import { axiosInstance as axios } from "services/axiosInstance";
import { Video, VideosFilter } from "features/videos/types";
import {
  VideoResponse,
  VideoReturn,
  VideosResponse,
} from "features/videos/services/api/types";
import { defaultFilter } from "configs/defaultFilter";
import { videosUrls } from "features/videos/services/api/urls";
import { APIResponse } from "types/APIResponse";
import { AxiosResponse } from "axios";

export interface GetAllVideosResponse extends Omit<APIResponse<any>, "data"> {
  videos: Video[];
}

export interface GetVideoResponse {
  video: Video;
}

export type GetAllVideos = (
  params: VideosFilter
) => Promise<GetAllVideosResponse>;

export interface CreateVideoResponse extends GetVideoResponse {}

export type GetVideoById = (id: string) => Promise<GetVideoResponse>;

type SelectedVideoTypes = "video_name" | "title" | "description";
export type CreateVideo = (
  video: Pick<Video, SelectedVideoTypes>
) => Promise<CreateVideoResponse>;

export const getAllVideos: GetAllVideos = async ({
  size = null,
  page = null,
  ...otherParams
}) => {
  const convertedSize = parseInt(size ? size : defaultFilter.size);
  const convertedPage = parseInt(page ? page : defaultFilter.page);

  const { data: res } = await axios.get<VideosResponse>(videosUrls.ALL_VIDEOS, {
    url: videosUrls.ALL_VIDEOS,
    params: { size: convertedSize, page: convertedPage, ...otherParams },
  });
  return {
    videos: res.data,
    message: res.message,
    size: convertedSize,
    pages: res.pages,
    itemsCount: res.itemsCount,
  };
};

export const getVideoById: GetVideoById = async (id) => {
  const { data: res } = await axios.get<VideoResponse>(
    videosUrls.VIDEO_BY_ID(id)
  );
  return {
    video: res.data,
  };
};

export const postVideo = async (video: FormData): Promise<VideoReturn> => {
  const { data: res } = await axios.post<
    VideoResponse,
    AxiosResponse<VideoResponse, any>,
    FormData
  >(videosUrls.CREATE_VIDEO, video);

  return {
    video: res.data,
  };
};
