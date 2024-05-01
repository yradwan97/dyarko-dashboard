import { Typography } from "@mui/material";
import VideoCommentItem from "features/videos/comments/components/VideoCommentItem";
import { VideoComment } from "features/videos/comments/types";
import { t } from "i18next";
import { Optional } from "types/optional";

type VideoCommentsListProps = {
  comments: Optional<VideoComment[]>;
};

const VideoCommentsList = ({ comments }: VideoCommentsListProps) => {
  const noComments = <Typography>{t("pages.dashboard.videos.comments.none")}</Typography>;
  const commentsList = comments?.map((comment) => (
    <VideoCommentItem key={comment._id} user={comment.user}>
      {comment.comment_body}
    </VideoCommentItem>
  ));

  return (
    <>
      {comments !== undefined && comments.length > 0
        ? commentsList
        : noComments}
    </>
  );
};

export default VideoCommentsList;
