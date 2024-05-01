import { Filter } from "types/filter";

export interface PointsTransaction {
  _id: string;
  amount: number;
  user: PointsUser;
  points: number;
  action: PointsAction;
  createdAt: string;
}

export interface PointsUser {
  _id: string;
  name: string;
  image: null;
  balance: 2.5;
  points: number;
}

export interface PointsAction {
  actionType: string;
}

export interface PointsTransactionFilter extends Filter {}
