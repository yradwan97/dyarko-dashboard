export interface LikesUrl {
  VIDEO_LIKE: (id: string) => string;
}

export const likesUrl: LikesUrl = {
  VIDEO_LIKE: (id) => `/videos/${id}/likes`,
};
