import { Skeleton, Stack } from "@mui/material";
import VideoActionsSkeleton from "features/videos/components/VideoActionsSkeleton";

const SingleVideoSkeleton = () => {
  return (
    <Stack>
      <Skeleton variant="rectangular" height="300px" />
      <VideoActionsSkeleton />
    </Stack>
  );
};

export default SingleVideoSkeleton;
