import LikeButton from "features/videos/likes/components/LikeButton";
import CommentButton from "features/videos/comments/components/CommentButton";
import { Optional } from "types/optional";
import { Video } from "features/videos/types";
import { useToggleLike } from "features/videos/likes/hooks/query/useToggleLike";
import EditButton from "components/shared/UI/buttons/EditButton";

type VideoActionsProps = {
  video: Optional<Video>;
  isEditable?: boolean;
};

const VideoActions = ({ video, isEditable = false }: VideoActionsProps) => {
  const { toggleLike, isDisabled } = useToggleLike({
    videoId: video?._id || "",
  });

  const handleLikeClick = async () => await toggleLike(video?.like);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-4">
        <LikeButton
          like={video?.like}
          onLike={handleLikeClick}
          disabled={isDisabled}
        />
        <CommentButton commentsCount={video?.comments} />
      </div>
      <div className="flex gap-x-4">{isEditable ? <EditButton /> : null}</div>
    </div>
  );
};

export default VideoActions;
