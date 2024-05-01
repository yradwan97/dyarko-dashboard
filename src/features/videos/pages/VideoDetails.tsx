import React from "react";
import { BackButton } from "components/shared/UI/buttons";
import { useNavigate, useParams } from "react-router-dom";
import useGetVideo from "features/videos/hooks/query/useGetVideo";
import VideoSection from "features/videos/components/VideoSection";
import CommentsSection from "features/videos/components/CommentsSection";
import VideoDetailsSection from "features/videos/components/VideoDetailsSection";

function VideoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) navigate("/not-found", { replace: true });

  const { isLoading, isError, isSuccess, data } = useGetVideo(id as string);
  const video = data?.video;

  return (
    <>
      <BackButton />
      <div className="flex flex-col md:flex-row">
        <div className="h-[80vh] md:w-1/2">
          <VideoSection
            videoThumbnail={video?.thumbnail}
            videoUrl={video?.video_name}
            videoTitle={video?.title}
          />
        </div>
        <div className="flex h-[80vh] w-full flex-col rounded-lg border border-main-200  md:w-1/2">
          <div className="flex flex-col space-y-6 p-6">
            <VideoDetailsSection video={video} />
          </div>
          <div className="px-4 relative grow">
            <CommentsSection video={video} />
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
