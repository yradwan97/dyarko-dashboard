import { ServerInvoice } from "./api/types";
import { Invoice } from "../types";

export const invoicesMapper = {
  toServerInvoice: (invoice: Invoice): ServerInvoice => {
    return {
      _id: invoice.id,
      title: invoice.title,
      user: invoice.user,
      property: invoice.property,
      owner: invoice.owner,
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      paid_at: invoice.paidAt,
      transaction: invoice.transactionId,
      details: invoice.details,
    };
  },
  toInvoice: (serverInvoice: ServerInvoice): Invoice => {
    return {
      id: serverInvoice._id,
      title: serverInvoice.title,
      user: serverInvoice.user,
      property: serverInvoice.property,
      owner: serverInvoice.owner,
      amount: serverInvoice.amount,
      status: serverInvoice.status,
      date: serverInvoice.date,
      paidAt: serverInvoice.paid_at,
      transactionId: serverInvoice.transaction,
      details: serverInvoice.details,
      ownerPdf: serverInvoice.ownerPdf
    };
  },
};
