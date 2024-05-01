import { lazy, useEffect, useState } from "react";
import { Input, Label } from "components/shared/form";
import { FiSearch } from "react-icons/fi";
import {
  InstallmentRequest,
} from "features/requests/installment-requests/index";
import { RequestStatus } from "features/requests/types";
import { useAppDispatch, useAppSelector } from "hooks";
import { getInstallment } from "../services/installmentsService";
import UpdateStatusModal from "../components/UpdateStatusModal";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";
const InstallmentRequestsTable = lazy(() => import("features/requests/installment-requests/components/InstallmentRequestsTable"))

const InstallmentRequests = () => {
  const dispatch = useAppDispatch();
  const installments = useAppSelector(state => state.installments);
  const [page, setPage] = useState(1);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const handlePageChange = (page: number) => { setPage(page) };
  const handleSearchInputChange = () => { };
  const handleStatusChange = (values: any) => {
    setShowUpdateStatusModal(values);
  };

  useEffect(() => {
    dispatch(getInstallment({ page }));
  }, [dispatch, page]);

  return (
    <div>
      <div className="relative w-7/12">
        <Label htmlFor="search">
          <FiSearch className="text-2xl text-main-secondary absolute top-1/2 left-3 -translate-y-1/2 z-1" />
        </Label>
        <Input
          id="search"
          className="pl-12"
          placeholder={t("general.search")!}
          type="search"
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="rounded-lg px-2 mt-6">
        <InstallmentRequestsTable
          installmentRequests={installments.data}
          handleUpdate={handleStatusChange}
        />
      </div>
      <Paginator
        page={page}
        lastPage={installments.pages}
        onChange={handlePageChange}
      />

      {showUpdateStatusModal && (
        <UpdateStatusModal data={showUpdateStatusModal} onClose={() => setShowUpdateStatusModal(false)} />
      )}
    </div>
  );
};

export default InstallmentRequests;
