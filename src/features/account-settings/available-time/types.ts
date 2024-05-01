import { Filter } from "types/filter";

export interface TourSchedule {
  id: string;
  availableDate: Date;
  availableTime: AvailableTime;
}

export interface AvailableTime {
  from: string;
  to: string;
}

export interface TourSchedulesFilter extends Filter {}
