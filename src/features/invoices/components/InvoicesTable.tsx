import { Table } from "components/shared/UI";
import { BodyTr, HeadTr, Td, Th } from "components/shared/UI/table";
import { Optional } from "types/optional";
import { RequestStatus } from "features/requests";
import { Invoice, InvoiceStatus } from "../types";
import { Chip } from "@mui/material";
import { Fab } from "@mui/material";
import { SyntheticEvent } from "react";
import { BsLink } from "react-icons/bs";
import {t} from "i18next"
export interface InvoicesTableProps {
  invoices: Optional<Invoice[]>;
  onStatusActionClick?: (requestId: string, status: RequestStatus) => void;
}


const InvoicesTable = ({
  invoices,
  onStatusActionClick,
}: InvoicesTableProps) => {
  let cols = [
    "title",
    "tenant",
    "date",
    "paid-at",
    "details",
    "total",
    "status",
    "pdf"
  ];

  const handleDisplayPdf = (e: SyntheticEvent, link: string) => {
    window.open(link, "_blank")
  }
  return (
    <Table>
      <thead>
        <HeadTr>
          {cols.map((col: string, index: number) => (
            <Th key={index}>{t(`pages.invoices.table.${col}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
        {invoices && invoices.length > 0 ? (
          invoices.map((invoice) => (
            <BodyTr key={invoice.id}>
              <Td>{invoice?.title ?? "---"}</Td>
              <Td>{invoice?.user?.name ?? "---"}</Td>
              <Td>
                {invoice.date
                  ? `${new Date(
                    invoice.date
                  ).toLocaleDateString()} - ${new Date(
                    invoice.date
                  ).toLocaleTimeString()}`
                  : "---"}
              </Td>
              <Td>
                {invoice.paidAt
                  ? `${new Date(
                    invoice.paidAt
                  ).toLocaleDateString()} - ${new Date(
                    invoice.paidAt
                  ).toLocaleTimeString()}`
                  : "---"}
              </Td>
              {invoice.details?.length > 0 ? (
                <>
                <HeadTr>
                  <Th>{t("general.description")}</Th>
                  <Th>{t("general.amount")}</Th>
                </HeadTr>
                {invoice.details?.map((detail) => (
                  <BodyTr key={detail._id}>
                    <Td>{detail.description}</Td>
                    <Td>{detail.amount}</Td>
                  </BodyTr>
                ))}
                </>
              ) : (
                <Td>---</Td>
              )}
              <Td>{invoice.amount.toFixed(1) ?? "---"}</Td>
              <Td className="w-1/12">
                <Chip label={invoice.status} color={invoice.status === InvoiceStatus.PAID ? "success" : "error"} />
              </Td>
              <Td>
                <Fab size="small" title={t("pages.invoices.open-pdf")!} onClick={(e) => handleDisplayPdf(e, invoice.ownerPdf as string)}>
                  <BsLink />
                </Fab>
              </Td>
            </BodyTr>
          ))
        ) : (
          <BodyTr>
            <Td colSpan={cols.length} className="text-center">
              {t("general.no-data")}
            </Td>
          </BodyTr>
        )}
      </tbody>
    </Table>
  );
};

export default InvoicesTable;
