import React, { useState } from "react";
import { PlayVideoSolid } from "components/shared/icons";
// @ts-ignore
import defaultThumbnail from "assets/images/video.png";
import { Optional } from "types/optional";

type VideoSectionProps = {
  videoThumbnail: Optional<string>;
  videoUrl: Optional<string>;
  videoTitle: Optional<string>;
};

const VideoSection = ({
  videoThumbnail,
  videoUrl,
  videoTitle,
}: VideoSectionProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => setShowVideo(true);

  return (
    <div className="relative h-full w-full">
      {showVideo || !videoUrl ? (
        <>
          <video
            crossOrigin="anonymous"
            className="h-full w-full"
            src={videoUrl as string}
            title={videoTitle}
            controls
            autoPlay
          >
            Your browser does not support HTML5
          </video>
        </>
      ) : (
        <>
          <img
            crossOrigin="anonymous"
            className="h-full w-full object-cover"
            src={videoThumbnail || defaultThumbnail}
            alt=""
          />
          <button onClick={handleShowVideo}>
            <PlayVideoSolid className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 stroke-black -translate-y-1/2 cursor-pointer fill-black" />
          </button>
        </>
      )}
    </div>
  );
};

export default VideoSection;
