import { Tabs } from "components/shared/UI";
import { ROUTES } from "configs/routes";
import { Outlet } from "react-router-dom";

const tabs = [
  {
    text: "rents",
    uri: ROUTES.RENT_CONTRACTS,
  },
];

const Contracts = () => {
  return (
    <>
      <Tabs tabs={tabs} />
      <Outlet />
    </>
  );
}

export default Contracts;
