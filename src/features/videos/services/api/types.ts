import { Video } from "features/videos/types";
import { APIResponse } from "types/APIResponse";

export interface VideosResponse extends APIResponse<Video> {}

export interface VideoResponse {
  data: Video;
}

export interface VideoReturn {
  video: Video;
}
