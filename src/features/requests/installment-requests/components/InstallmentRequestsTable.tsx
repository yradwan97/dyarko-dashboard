import { InstallmentRequest } from "features/requests/installment-requests";
import { Table } from "components/shared/UI";
import { BodyTr, HeadTr, Td, Th } from "components/shared/UI/table";
import { Optional } from "types/optional";
import {
  RequestsActionsMenu,
  RequestStatusBadge,
} from "features/requests";
import { t } from "i18next";

export interface InstallmentRequestsTableProps {
  installmentRequests: Optional<InstallmentRequest[]>;
  handleUpdate: any;
}

const cols = [
  "request-date",
  "user",
  "phone",
  "property-id",
  "status",
  "actions",
];

const InstallmentRequestsTable = ({
  installmentRequests,
  handleUpdate,
}: InstallmentRequestsTableProps) => {
  return (
    <Table>
      <thead>
        <HeadTr>
          {cols.map((col, index) => (
            <Th key={index}>{t(`pages.requests.installment.table.${col}`)}</Th>
          ))}
        </HeadTr>
      </thead>
      <tbody>
        {installmentRequests && installmentRequests.length > 0 ? (
          installmentRequests.map((installmentRequest: any) => (
            <BodyTr key={installmentRequest._id}>
              <Td>{new Date(installmentRequest?.createdAt).toLocaleDateString()}</Td>
              <Td>{installmentRequest?.user?.name}</Td>
              <Td>{installmentRequest?.user?.phone}</Td>
              <Td>{installmentRequest?.property?._id}</Td>
              <Td>
                <RequestStatusBadge status={installmentRequest.owner_status} />
              </Td>
              <Td className="w-1/12">
                {installmentRequest.owner_status === "approved" ? (
                  "-"
                ) : (
                  <RequestsActionsMenu
                    handleStatusChange={(status: any) => handleUpdate({ status, installmentRequest })}
                  />
                )}
              </Td>
            </BodyTr>
          ))
        ) : (
          <BodyTr>
            <Td colSpan={6} className="text-center">
              {t("general.no-data")}
            </Td>
          </BodyTr>
        )}
      </tbody>
    </Table>
  );
};

export default InstallmentRequestsTable;
