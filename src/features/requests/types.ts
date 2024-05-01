import { Filter } from "types/filter";

export enum RequestStatus {
  PENDING = "pending",
  VISITED = "visited",
  APPROVED = "approved",
  CANCELLED = "cancelled",
  DENIED = "denied",
}

export interface RequestUser {
  _id: string;
  name: string;
  image: string | null;
  balance: string | null;
}

export interface RequestProperty {
  _id: string;
}

export interface Request {
  _id: string;
  date: string;
  phone: string;
  user: RequestUser;
  property: RequestProperty;
  status: RequestStatus;
}

export interface RequestsFilter extends Filter {}
