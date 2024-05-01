import { BalanceInvoice, DyarkoTransacation } from "features/wallet";
import { Optional } from "types/optional";
import { BodyTr, HeadTr, Table, Td, Th } from "components/shared/UI/table";
import { t } from "i18next";


export interface BalanceTableProps {
  tableTitle? :string
  transactions: Optional<BalanceInvoice[]>;
}

const BalanceTable = ({ transactions, tableTitle = `${t("pages.wallet.balance.transactions")}` }: BalanceTableProps) => {
  const cols = ["process", "due-date", "balance"];
  return (
    <Table title={tableTitle}>
      <thead>
        <HeadTr>
          {cols.map((head) => (
            <Th key={head}>{t(`pages.wallet.balance.table.${head}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
        {transactions ? (
          transactions.map((row, index) => (
            <BodyTr key={index}>
              <Td>{row.title}</Td>
              <Td>{new Date(row.date).toDateString()}</Td>
              <Td className={row.amount < 0 ? "text-red" : "text-primary"}>
                {row.amount.toFixed(3)}
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
  );
};

export default BalanceTable;
