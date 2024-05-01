import { VideoComment } from "features/videos/comments/types";
import { APIResponse } from "types/APIResponse";

export interface CommentsResponse extends APIResponse<VideoComment> {}

export interface CommentResponse {
  data: VideoComment;
}

export interface CommentRequestData {
  comment: string;
}
