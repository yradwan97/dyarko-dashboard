import { axiosInstance as axios, noAuthAxios } from "services/axiosInstance";
import { defaultFilter } from "configs/defaultFilter";
import { CommentsFilter, VideoComment } from "features/videos/comments/types";

import { commentsUrl } from "features/videos/comments/services/urls";
import { APIResponse } from "types/APIResponse";
import { User } from "features/users/types";
import {
  CommentRequestData,
  CommentResponse,
  CommentsResponse,
} from "features/videos/comments/services/api/types";
import { AxiosResponse } from "axios";

export interface GetAllCommentsReturn extends Omit<APIResponse<any>, "data"> {
  comments: VideoComment[];
}

export interface GetCommentResponse {
  comment: VideoComment;
}

export interface PostCommentResponse {
  commentBody: string;
  user: User;
  video: string;
  _id: "63f0c428b07e3207173edea7";
  like: [];
}

export type GetAllComments = (
  videoId: string,
  params: CommentsFilter
) => Promise<GetAllCommentsReturn>;

export type PostComment = (
  comment: VideoComment
) => Promise<PostCommentResponse>;

export const getAllComments: GetAllComments = async (
  videoId,
  { size = null, page = null, ...otherParams }
) => {
  const convertedSize = parseInt(size ? size : defaultFilter.size);
  const convertedPage = parseInt(page ? page : defaultFilter.page);

  const { data: res } = await noAuthAxios.get<CommentsResponse>(
    commentsUrl.ALL_COMMENTS(videoId),
    {
      params: { size: convertedSize, page: convertedPage, ...otherParams },
    }
  );

  return {
    comments: res.data,
    message: res.message,
    size: convertedSize,
    pages: res.pages,
    itemsCount: res.itemsCount,
  };
};

export const postComment = async (comment: VideoComment) => {
  const { data: res } = await axios.post<
    CommentResponse,
    AxiosResponse<CommentResponse, null>,
    CommentRequestData
  >(commentsUrl.ALL_COMMENTS(comment.video), { comment: comment.comment_body });
  return {
    comment: res.data,
  };
};
