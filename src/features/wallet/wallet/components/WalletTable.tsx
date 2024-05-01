import { Table } from 'components/shared/UI';
import { BodyTr, HeadTr, Td, Th } from 'components/shared/UI/table';
import { WalletRecord } from 'features/wallet/balance/types';
import { t } from 'i18next';
import React from 'react'

export interface WalletTableProps {
  records: WalletRecord[]
  title: string
}

const WalletTable = ({records, title} : WalletTableProps) => {
    const cols = ["process", "due-date", "balance"];
  return (
    <Table title={title}>
      <thead>
        <HeadTr>
          {cols.map((head) => (
            <Th key={head}>{t(`pages.wallet.user-wallet.table.${head}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
        {
        records ? (
          records.map((row, index) => (
            <BodyTr key={index}>
              <Td>{row.type}</Td>
              <Td>{new Date(row.date).toDateString()}</Td>
              <Td className={row.amount < 0 ? "text-red" : "text-main-600"}>
                {row.amount.toFixed(2)}
              </Td>
            </BodyTr>
          ))
        ) :
         (
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

export default WalletTable