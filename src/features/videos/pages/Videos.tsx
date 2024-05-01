import React from "react";
import useVideosFilterReducer, {
  VIDEOS_FILTER,
} from "features/videos/hooks/useVideosFilterReducer";
import { defaultFilter } from "configs/defaultFilter";
import useGetVideos from "features/videos/hooks/query/useGetVideos";
import { Typography } from "components/shared/UI";
import EmptyPage from "components/views/EmptyPage";
import { Button, ButtonVariant } from "components/shared/UI/buttons";
import { Link } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { PlusIcon } from "@heroicons/react/20/solid";
import SingleVideo from "../components/SingleVideo";
import Paginator from "components/shared/pagination/Paginator";
import { toastifyClient } from "services/toastifyClient";
import SingleVideoSkeleton from "features/videos/components/SingleVideoSkeleton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { t } from "i18next";

function Videos() {
  const [filter, dispatchFilter] = useVideosFilterReducer(defaultFilter);
  const { isLoading, isError, data, isSuccess, error, refetch } = useGetVideos({
    filter,
  });
  const videos = data?.videos;
  const handlePageChange = (newPage: number) => {
    dispatchFilter({ filter: VIDEOS_FILTER.PAGE, value: newPage });
  };

  if (isError) toastifyClient.error({ message: error?.message || "Error" });

  return (
    <div className="relative">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <SingleVideoSkeleton key={index} />
            ))}
        </div>
      ) : null}
      {isSuccess && videos && videos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {videos?.map((video) => (
              <SingleVideo key={video._id} video={video} />
            ))}
          </div>
          <Paginator
            lastPage={data?.pages || 1}
            page={parseInt(filter?.page || "1")}
            onChange={handlePageChange}
          />
        </>
      ) : null}
      {isSuccess && videos && videos.length < 0 ? (
        <EmptyPage>
          <div className="flex flex-col space-y-5 items-center">
            <Typography variant="h4" as="h3">
              When you add videos they will appear here
            </Typography>
            <Button variant={ButtonVariant.PRIMARY}>
              <Typography variant="body-sm-bold" as="p" className="flex">
                <PlusIcon className="w-5 h-5" />
                <Link to={ROUTES.ADD_VIDEO}>{t("general.videos.add-video.text")}</Link>
              </Typography>
            </Button>
          </div>
        </EmptyPage>
      ) : null}
      {isError ? (
        <EmptyPage>
          <div className="flex flex-col space-y-5 items-center">
            <Typography variant="h4" as="h3">
              {t("general.videos.no-videos")}
            </Typography>
            <Button variant={ButtonVariant.PRIMARY} onClick={refetch}>
              <RefreshIcon />
            </Button>
          </div>
        </EmptyPage>
      ) : null}
    </div>
  );
}

export default Videos;
