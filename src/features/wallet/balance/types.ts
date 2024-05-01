import { Filter } from "types/filter";

export enum BALANCE_TRANSACTION_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export interface BalanceInvoice {
  _id: string;
  amount: number;
  date: string;
  createdAt: string;
  title: string;
}

export interface DyarkoTransacation {
  _id: string;
  amount: number;
  owner: {
    _id: string,
    role: string,
    name: string,
    image: string,
    point_balance?: number | null,
    net_balance?: number | null,
    total_balance?: number | null
  },
  createdAt?: Date
  updatedAt?: Date
}

export interface WalletRecord {
  amount: number
  createdAt: string
  date: string
  type: string
  updatedAt: string
  user : {
    image: string
    name: string
    point_balance: number
    _id: string
  }
}

export interface BalanceTransactionFilter extends Filter {}
export interface WalletFilter extends Filter {}
export interface DyarkoTransactionFilter extends Filter {}
