import { BalanceInvoice, DyarkoTransacation, WalletRecord } from "features/wallet";
import { Optional } from "types";

export interface GetBalanceTransactionsResponse {
  data: BalanceInvoice[]
  itemsCount: number
  pages: number
}

export interface GetDyarkoTransactionsResponse {
    data:  DyarkoTransacation[]
    itemsCount: number;
    pages: number;
}

export interface GetWalletRecordsResponse {
  data:  WalletRecord[]
  itemsCount: number;
  pages: number;
}

export interface GetBalanceTransactionsReturn {
  itemsCount: number;
  pagesCount: number;
  // totalBalance: number;
  balanceTransactions: BalanceInvoice[];
  size: Optional<string>;
}

export interface GetDyarkoTransactionsReturn {
  itemsCount: number;
  pagesCount: number;
  balanceTransactions: DyarkoTransacation[];
  size: Optional<string>;
}

export interface GetWalletRecordsReturn {
  itemsCount: number;
  pagesCount: number;
  records: WalletRecord[];
}
