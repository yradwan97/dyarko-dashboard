import React, { ChangeEventHandler } from "react";
import { FiSearch } from "react-icons/fi";
import {
  TOUR_REQUESTS_FILTER,
  TourRequestsTable,
  useGetTourRequests,
  useTourRequestsFilterReducer,
} from "features/requests/tour-requests";

import { Input, Label } from "components/shared/form";
import { TableSkeleton } from "components/shared/UI/table";
import { toastifyClient } from "services/toastifyClient";
import useMutateTourRequest from "features/requests/tour-requests/hooks/query/useMutateTourRequest";
import { RequestStatus } from "features/requests/types";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";

const TourRequests = () => {
  const [filter, dispatchFilter] = useTourRequestsFilterReducer();
  const { data, isLoading, isSuccess, isError, error } = useGetTourRequests({
    filter,
  });
  const { changeTourRequestStatus } = useMutateTourRequest();

  const handleStatusChange = (requestId: string, status: RequestStatus) => {
    changeTourRequestStatus(requestId, status);
  };

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {};

  const handlePageChange = (page: number) => {
    dispatchFilter({ filter: TOUR_REQUESTS_FILTER.PAGE, value: page });
  };

  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  return (
    <div>
      <div className="relative w-7/12">
        <Label htmlFor="search">
          <FiSearch className="text-2xl text-main-secondary absolute top-1/2 left-3 -translate-y-1/2 z-1" />
        </Label>
        <Input
          id="search"
          className="pl-12"
          placeholder={t("general.search")!}
          type="search"
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="rounded-lg px-2 mt-6">
        {isLoading ? <TableSkeleton colsNumber={6} /> : null}
        {isSuccess ? (
          <TourRequestsTable
            tourRequests={data?.tourRequests}
            onStatusActionClick={handleStatusChange}
          />
        ) : null}
      </div>
      <Paginator
        page={Number(filter.page)}
        lastPage={data?.pages || 0}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default TourRequests;
