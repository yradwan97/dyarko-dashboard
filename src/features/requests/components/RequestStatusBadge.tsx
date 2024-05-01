import { RequestStatus } from "features/requests";

const statusMap: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: "text-error",
  [RequestStatus.VISITED]: "text-main-yellow-500",
  [RequestStatus.APPROVED]: "text-main-500",
  [RequestStatus.DENIED]: "text-error",
  [RequestStatus.CANCELLED]: "text-error",
};

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

const RequestStatusBadge = ({ status }: RequestStatusBadgeProps) => {
  return <span className={statusMap[status]}>{status}</span>;
};

export default RequestStatusBadge;
