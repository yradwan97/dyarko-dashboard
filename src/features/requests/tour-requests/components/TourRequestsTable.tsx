import { TourRequest } from "features/requests/tour-requests";
import { Table } from "components/shared/UI";
import { BodyTr, HeadTr, Td, Th } from "components/shared/UI/table";
import { Optional } from "types/optional";
import {
  RequestsActionsMenu,
  RequestStatus,
  RequestStatusBadge,
} from "features/requests";
import { t } from "i18next";

export interface TourRequestsTableProps {
  tourRequests: Optional<TourRequest[]>;
  onStatusActionClick: (requestId: string, status: RequestStatus) => void;
}

const cols = ["date", "user", "phone", "property-id", "status", "actions"];

const TourRequestsTable = ({
  tourRequests,
  onStatusActionClick,
}: TourRequestsTableProps) => {
  return (
    <Table>
      <thead>
        <HeadTr>
          {cols.map((col, index) => (
            <Th key={index}>{t(`pages.requests.tour.table.${col}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
        {(tourRequests && tourRequests.length > 0) ? (
          tourRequests.map((tourRequest) => (
            <BodyTr key={tourRequest._id}>
              <Td>{new Date(tourRequest.date).toLocaleDateString()}</Td>
              <Td>{tourRequest.user.name}</Td>
              <Td>{tourRequest.phone}</Td>
              <Td>{tourRequest?.property?._id ?? "---"}</Td>
              <Td>
                <RequestStatusBadge status={tourRequest.status} />
              </Td>
              <Td className="w-1/8">
                <RequestsActionsMenu
                  requestId={tourRequest._id}
                  status={tourRequest.status}
                  handleStatusChange={onStatusActionClick}
                />
              </Td>
            </BodyTr>
          ))
        ) : (
          <BodyTr>
            <Td colSpan={cols.length} className="text-center">
              {t("general.search")}
            </Td>
          </BodyTr>
        )}
      </tbody>
    </Table>
  );
};

export default TourRequestsTable;
