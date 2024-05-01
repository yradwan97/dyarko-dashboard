import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ViewsBadge from "features/videos/components/ViewsBadge";
import { Video } from "features/videos";
import { Optional } from "types/optional";
import { ROUTES } from "configs/routes";
import VideoActions from "features/videos/components/VideoActions";
import VideoTitle from "features/videos/components/VideoTitle";

type SingleVideoProps = {
  video: Optional<Video>;
};

function SingleVideo({ video }: SingleVideoProps) {
  return (
    <div className="bg-white rounded-lg">
      <div className="w-full h-[310px] bg-vedioImg bg-cover bg-center relative">
        <ViewsBadge views={video?.views} />
        <Link to={`${ROUTES.VIDEO_DETAILS}/${video?._id}`}>
          <BsFillPlayCircleFill className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/40 cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-col space-y-6 p-6">
        <VideoTitle
          title={video?.title}
          link={`${ROUTES.VIDEO_DETAILS}/${video?._id}`}
        />
        <VideoActions video={video} />
      </div>
    </div>
  );
}

export default SingleVideo;
