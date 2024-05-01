export interface CommentsUrl {
  ALL_COMMENTS: (videoId: string) => string;
}

export const commentsUrl: CommentsUrl = {
  ALL_COMMENTS: (videoId) => `/videos/${videoId}/comments`,
};
