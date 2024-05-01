import { axiosInstance as axios } from "services/axiosInstance";
import {
  GetInvoicesResponse,
  GetInvoicesReturn,
  GetChartDataResponse,
  GetChartDataReturn,
} from "./types";
import { invoicesMapper } from "../invoicesMapper";
import { Invoice, InvoicesFilter } from "features/invoices";
import { invoicesUrls } from "./urls";

export const getInvoices = async (
  filter: InvoicesFilter
): Promise<GetInvoicesReturn> => {
  const { data: res } = await axios.get<GetInvoicesResponse>(
    invoicesUrls.GET_ALL,
    {
      params: filter,
    }
  );
  const invoices = res.data.map(invoicesMapper.toInvoice);

  return {
    invoices,
    itemsCount: res.itemsCount,
    size: res.size,
    pages: res.pages,
    message: res.message,
  };
};

export const getChartData = async (): Promise<GetChartDataReturn> => {
  const { data: res } = await axios.get<GetChartDataResponse>(
    invoicesUrls.GET_CHART_DATA
  );

  return {
    dataPoints: res.data,
  };
};
