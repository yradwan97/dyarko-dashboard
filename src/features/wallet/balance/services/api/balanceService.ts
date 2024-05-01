import { axiosInstance as axios } from "services/axiosInstance";
import {
  BALANCE_TRANSACTIONS_URLS,
  BalanceTransactionFilter,
  GetBalanceTransactionsResponse,
  GetBalanceTransactionsReturn,
  GetDyarkoTransactionsResponse,
  GetDyarkoTransactionsReturn,
  GetWalletRecordsResponse,
  GetWalletRecordsReturn,
  WalletFilter,
} from "features/wallet";

export const getTransactions = async (
  filter: BalanceTransactionFilter
): Promise<GetBalanceTransactionsReturn> => {
  const { data: res } = await axios.get<GetBalanceTransactionsResponse>(
    BALANCE_TRANSACTIONS_URLS.ALL_INVOICES,
    {
      params: filter,
    }
  );

  return {
    balanceTransactions: res.data,
    itemsCount: res.itemsCount,
    pagesCount: res.pages,
    size: filter.size,
  };
};
export const getWalletRecords = async (
  filter: WalletFilter
): Promise<GetWalletRecordsReturn> => {
  const { data: res } = await axios.get<GetWalletRecordsResponse>(
    BALANCE_TRANSACTIONS_URLS.WALLET_RECHARGE,
    {
      params: filter,
    }
  );
  return {
    records: res.data,
    itemsCount: res.itemsCount,
    pagesCount: res.pages,
  };
};

export const getDyarkoTransactions = async (
  filter: BalanceTransactionFilter
): Promise<GetDyarkoTransactionsReturn> => {
  const { data: res } = await axios.get<GetDyarkoTransactionsResponse>(
    BALANCE_TRANSACTIONS_URLS.DYARKO_TRANSACTIONS,
    {
      params: filter,
    }
  );
  return {
    balanceTransactions: res.data,
    itemsCount: res.itemsCount,
    pagesCount: res.pages,
    size: filter.size,
  };
};

export const getPointsQuestionMarkData = async () => {
  let res = await axios.get("/static/ownerWallet").then((res) => {
    res.data.data = [res.data.data];
    return res;
  });
  return res.data.data;
};

export const getBalanceQuestionMarkData = async () => {
  let res = await axios.get("/static/ownerBalance")
  return res.data.data;
};

export const getWalletQuestionMarkData = async () => {
  let res1 = await axios.get("/features");
  let res2 = await axios.get("/pricing_manager");
  return {
    pricing: res2.data.data,
    features: res1.data.data
  };
};
