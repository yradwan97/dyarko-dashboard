import { PromoteButton } from "components/shared/UI/buttons";
import { Link } from "react-router-dom";
import { Typography } from "components/shared/UI";
import { Skeleton } from "@mui/material";

const VideoActionsSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <Skeleton variant="text">
        <Typography variant="h4" as="h3" className="capitalize">
          <Link to="">Lorem ipsum dolor</Link>
        </Typography>
      </Skeleton>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-x-4">
          <Skeleton variant="circular" width="2rem" height="2rem" />
          <Skeleton variant="circular" width="2rem" height="2rem" />
        </div>
        <Skeleton variant="rounded">
          <PromoteButton propertyId={undefined} />
        </Skeleton>
      </div>
    </div>
  );
};

export default VideoActionsSkeleton;
