import { Optional } from "types/optional";
import { ROUTES } from "configs/routes";
import VideoActions from "features/videos/components/VideoActions";
import { Video } from "features/videos";
import VideoTitle from "features/videos/components/VideoTitle";
import VideoDescription from "features/videos/components/VideoDescription";

interface VideoDetailsSectionProps {
  video: Optional<Video>;
}

const VideoDetailsSection = ({ video }: VideoDetailsSectionProps) => {
  return (
    <>
      <VideoTitle
        title={video?.title}
        link={`${ROUTES.VIDEO_DETAILS}/${video?._id}`}
      />
      <VideoDescription maxChars={150}>
        {video?.description || ""}
      </VideoDescription>
      <VideoActions video={video} isEditable={true} />
    </>
  );
};

export default VideoDetailsSection;
