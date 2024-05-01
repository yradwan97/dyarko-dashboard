import React, { useEffect, useState } from "react";
import { Typography } from "components/shared/UI";
import {
  AddTourScheduleForm,
  AvailableTimeTable,
  TOUR_SCHEDULES_FILTER,
  TourSchedule,
  useGetTourSchedules,
  useMutateTourSchedule,
  useTourSchedulesFilterReducer,
} from "features/account-settings";
import { useAppDispatch, useAppSelector } from "hooks";
import { getSchedules } from "../services/schedulesService";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";

const AvailableTime = () => {
  const dispatch = useAppDispatch();
  const schedules = useAppSelector(state => state.schedules);
  const [filter, dispatchFilter] = useTourSchedulesFilterReducer();
  const [page, setPage] = useState(1);

  const { createTourSchedule } = useMutateTourSchedule();

  const addTourScheduleHandler = (tourSchedule: Omit<TourSchedule, "id">) => {
    createTourSchedule(tourSchedule);
  };

  const handlePageChange = (page: number) => {
    dispatchFilter({ filter: TOUR_SCHEDULES_FILTER.PAGE, value: page });
  };

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" as="h2" className="capitalize text-black mb-6">
        {t("account.tour.tour-schedule")}
      </Typography>
      <div className="flex flex-col space-y-10">
        <AvailableTimeTable tourSchedules={schedules.data} />
        <Paginator
          page={page}
          lastPage={schedules.pages || 0}
          onChange={handlePageChange}
        />
        <Typography variant="h4" as="h4" className="capitalize">
          {t("general.add")} {t("account.tour.tour-schedule")}
        </Typography>
        <AddTourScheduleForm onSubmit={addTourScheduleHandler} />
      </div>
    </>
  );
};

export default AvailableTime;
