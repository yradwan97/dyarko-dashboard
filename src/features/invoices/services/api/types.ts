import {
  Invoice,
  InvoiceDetail,
  InvoiceStatus,
  InvoiceUser,
} from "features/invoices";
import { APIResponse, Nullable } from "types";

export interface GetInvoicesResponse extends APIResponse<ServerInvoice> {}

export interface GetInvoicesReturn extends Omit<GetInvoicesResponse, "data"> {
  invoices: Invoice[];
}



export interface GetChartDataResponse {
  data: ChartPoint[];
}

export interface GetChartDataReturn {
  dataPoints: ChartPoint[];
}

export interface ChartPoint {
  _id: {
    year: number;
    month: number;
  };
  totalAmount: number;
}

export interface ServerInvoice {
  _id: string;
  title: string;
  user: Nullable<InvoiceUser>;
  owner: Nullable<string>;
  property: string;
  amount: number;
  status: InvoiceStatus;
  date: Nullable<string>;
  paid_at: Nullable<string>;
  transaction: string;
  details: InvoiceDetail[];
  ownerPdf?: string
}
