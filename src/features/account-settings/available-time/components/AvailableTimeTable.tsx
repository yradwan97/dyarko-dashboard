import { BodyTr, HeadTr, Table, Td, Th } from "components/shared/UI/table";
import { TourSchedule } from "features/account-settings";
import { t } from "i18next";
import { Optional } from "types/optional";

interface AvailableTimeTableProps {
  tourSchedules: Optional<TourSchedule[]>;
}

const AvailableTimeTable = ({ tourSchedules }: any) => {
  return (
    <Table title="Created Tour Schedule">
      <thead>
        <HeadTr>
          <Th rowSpan={2} className="w-1/2">
            {t("account.tour.available-date")}
          </Th>
          <Th colSpan={2} className="w-1/2 text-center">
            {t("account.tour.available-time")}
          </Th>
        </HeadTr>
        <HeadTr>
          <Th>From</Th>
          <Th>To</Th>
        </HeadTr>
      </thead>
      <tbody>
        {tourSchedules?.map((tourSchedule: any) => (
          <BodyTr key={tourSchedule.id}>
            <Td>{new Date(tourSchedule.to).toLocaleDateString()}</Td>
            <Td>{new Date(tourSchedule.from).toLocaleTimeString()}</Td>
            <Td>{new Date(tourSchedule.to).toLocaleTimeString()}</Td>
          </BodyTr>
        ))}
      </tbody>
    </Table>
  );
};

export default AvailableTimeTable;
