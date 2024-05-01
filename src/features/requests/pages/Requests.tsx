import { Tabs } from "components/shared/UI";
import { ROUTES } from "configs/routes";
import { t } from "i18next";
import { Outlet } from "react-router-dom";

const tabs = [
  {
    text: "tour-requests",
    uri: ROUTES.TOUR_REQUESTS,
  },
  {
    text: "installment-requests",
    uri: ROUTES.INSTALLMENT_REQUESTS,
  },
];

const Requests = () => {
  return (
    <div className="flex flex-col space-y-5">
      <Tabs tabs={tabs} />
      <>
        <Outlet />
      </>
    </div>
  );
};

export default Requests;
