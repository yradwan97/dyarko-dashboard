import { APIResponse } from "types/APIResponse";
import { PointsTransaction, PointsTransactionFilter } from "features/wallet";

export interface GetPointsTransactionsResponse
  extends APIResponse<PointsTransaction> {}

export type GetPointsTransactions = (
  filter: PointsTransactionFilter
) => Promise<GetPointsTransactionsResponse>;
