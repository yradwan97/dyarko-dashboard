import { PointsTransaction } from "features/wallet";
import { Optional } from "types/optional";
import { BodyTr, HeadTr, Table, Td, Th } from "components/shared/UI/table";
import { t } from "i18next";

const cols = ["process", "due-date", "amount", "points"];

export interface PointsTableProps {
  pointsTransactions: Optional<PointsTransaction[]>;
}

const PointsTable = ({ pointsTransactions }: PointsTableProps) => {
  return (
    <Table title={t("general.points")}>
      <thead>
        <HeadTr>
          {cols.map((head) => (
            <Th key={head}>{t(`pages.wallet.points.table.${head}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
        {pointsTransactions?.map((row, index) => (
          <BodyTr key={index}>
            <Td>{row.action.actionType}</Td>
            <Td>{new Date(row.createdAt).toDateString()}</Td>
            <Td>{t("general.dinar")} {row.amount.toFixed(3)}</Td>
            <Td className={row.points < 0 ? "text-red" : "text-info"}>
              {row.points > 0 ? "+" : null}
              {row.points}&nbsp;
              {row.points === 1 ? t("general.point") : t("general.points")}
            </Td>
          </BodyTr>
        ))}
      </tbody>
    </Table>
  );
};

export default PointsTable;
