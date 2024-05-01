import { ServerTourSchedule, TourSchedule } from "features/account-settings";

export interface TourScheduleMapper {
  toServerTourSchedule: (
    tourSchedule: Omit<TourSchedule, "id">
  ) => Omit<ServerTourSchedule, "_id">;
  toTourSchedule: (serverTourSchedule: ServerTourSchedule) => TourSchedule;
}

export const tourScheduleMapper: TourScheduleMapper = {
  toServerTourSchedule: (tourSchedule) => {
    const availableDate = tourSchedule.availableDate.toLocaleDateString();
    const fromDate = new Date(
      `${availableDate} ${tourSchedule.availableTime.from}`
    );
    const toDate = new Date(
      `${availableDate} ${tourSchedule.availableTime.to}`
    );
    return {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    };
  },
  toTourSchedule: (serverTourSchedule) => {
    const dateFrom = new Date(serverTourSchedule.from);
    const dateTo = new Date(serverTourSchedule.to);
    const tourSchedule: TourSchedule = {
      id: serverTourSchedule._id,
      availableDate: dateFrom,
      availableTime: {
        from: dateFrom.toLocaleTimeString(),
        to: dateTo.toLocaleTimeString(),
      },
    };
    return tourSchedule;
  },
};
