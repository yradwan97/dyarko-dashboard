import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { FiSearch } from "react-icons/fi";
import { Input, Label } from "components/shared/form";
import Table from "../components/Table";
import { getInstallmentContracts } from "../../services/contractsService";
import EndContractModal from "../../components/EndContractModal";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";

const InstallmentContracts = () => {
  const dispatch = useAppDispatch();
  const contracts = useAppSelector(state => state.contracts);
  const [page, setPage] = useState(1);
  const [showEndContractModal, setShowEndContractModal] = useState(false);

  useEffect(() => {
    dispatch(getInstallmentContracts({ page }));
  }, [dispatch, page]);


  return (
    <div>
      <div className="relative w-7/12 mt-6">
        <Label htmlFor="search">
          <FiSearch className="text-2xl text-main-secondary absolute top-1/2 left-3 -translate-y-1/2 z-1" />
        </Label>
        <Input
          id="search"
          className="pl-12"
          placeholder="Search tenant by name or property id..."
          type="search"
          onChange={(e) => console.log(e)}
        />
      </div>

      {contracts.isLoading ? (
        <h1>{t("general.loading")} ...</h1>
      ) : (
        <Table
          data={contracts.data}
          handleEndContract={(e) => setShowEndContractModal(e)}
          handleDisclaimer={(e) => setShowDisclaimerModal(e)}
        />
      )}

      <Paginator
        page={page}
        lastPage={contracts.pages}
        onChange={(page) => setPage(page)}
      />

      {showEndContractModal && (
        <EndContractModal
          data={showEndContractModal}
          onClose={() => setShowEndContractModal(false)}
        />
      )}
    </div>
  );
}

export default InstallmentContracts;
