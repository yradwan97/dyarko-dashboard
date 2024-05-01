import { Outlet } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { Tabs } from "components/shared/UI";
import { t } from "i18next";

const tabs = [
  {
    text: "properties",
    uri: ROUTES.PROPERTIES,
  },
  {
    text: "videos",
    uri: ROUTES.VIDEOS,
  },
];

function Dashboard() {
  return (
    <div className="flex flex-col space-y-5">
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default Dashboard;
