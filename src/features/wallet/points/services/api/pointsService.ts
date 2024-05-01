import { axiosInstance as axios } from "services/axiosInstance";
import {
  GetPointsTransactions,
  GetPointsTransactionsResponse,
  POINTS_TRANSACTIONS_URLS,
  PointsTransactionFilter,
} from "features/wallet";

export const getPointsTransactions: GetPointsTransactions = async (
  filter: PointsTransactionFilter
) => {
  const { data: res } = await axios.get<GetPointsTransactionsResponse>(
    POINTS_TRANSACTIONS_URLS.ALL_TRANSACTIONS,
    {
      params: filter,
    }
  );
  return {
    data: res.data,
    message: res.message,
    size: res.size,
    pages: res.pages,
    itemsCount: res.itemsCount,
  };
};
