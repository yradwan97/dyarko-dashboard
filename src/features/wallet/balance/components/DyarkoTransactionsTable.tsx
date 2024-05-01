import { DyarkoTransacation } from "features/wallet";
import { Optional } from "types/optional";
import { BodyTr, HeadTr, Table, Td, Th } from "components/shared/UI/table";
import React from 'react'
import { t } from "i18next";

export interface DyarkoTransacationsTableProps {
    transactions: Optional<DyarkoTransacation[]>
}


const DyarkoTransactionsTable = ({transactions} : DyarkoTransacationsTableProps) => {
    const cols = ["title", "date", "amount"]
  return (
    <Table title={t("pages.wallet.dyakro-transactions.dyakro-transactions")}>
      <thead>
      <HeadTr>
          {cols.map((head) => (
            <Th key={head}>{t(`pages.wallet.dyakro-transactions.table.${head}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
      {transactions ? (
          transactions.map((row, index) => (
            <BodyTr key={index}>
              <Td>{t("pages.wallet.dyakro-transactions.dyarko-transfer")}</Td>
              <Td>{new Date(row.createdAt!).toDateString()}</Td>
              <Td className={row.amount < 0 ? "text-red" : "text-primary"}>
                {row.amount}
              </Td>
            </BodyTr>
          ))
        ) : (
          <BodyTr>
            <Td
              colSpan={cols.length}
              className="text-lg text-black text-center"
            >
              {t("general.no-data")}
            </Td>
          </BodyTr>
        )}
      </tbody>
    </Table>
    )
}

export default DyarkoTransactionsTable