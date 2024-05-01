import { User } from "features/users";
import { Filter, Nullable } from "types";

export enum InvoiceStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export interface InvoiceDetail {
  _id: string;
  description: string;
  amount: number;
}

export interface InvoiceUser extends Pick<User, "id" | "name" | "image"> {}

export interface Invoice {
  id: string;
  title: string;
  user: Nullable<InvoiceUser>;
  owner: Nullable<string>;
  property: string;
  amount: number;
  status: InvoiceStatus;
  date: Nullable<string>;
  paidAt: Nullable<string>;
  ownerPdf?: string
  transactionId: string;
  rent_type?: string
  details: InvoiceDetail[];
}

export interface InvoicesFilter extends Filter {
  city?: string;
  renter_name?: string;
  title?: string;
  property?: string;
  property_title?: string;
  code?: string;
  date_to?: string;
  date_from?: string;
  status?: string;
}
