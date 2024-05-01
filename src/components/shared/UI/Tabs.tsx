import { t } from "i18next";
import { NavLink } from "react-router-dom";
import { Optional } from "types/optional";

type GetClassName = (props: {
  isActive: boolean;
  isPending: boolean;
}) => Optional<string>;

const getClassName: GetClassName = ({ isActive }) => {
  const defaultClasses =
    "block text-sm px-6 py-2 rounded-md capitalize outline-0";
  const stateClasses = isActive
    ? "bg-white font-bold text-main-600 shadow-sm border border-gray-200"
    : "text-gray-400 font-medium";
  return `${defaultClasses} ${stateClasses}`;
};

export interface TabsProps {
  tabs: TabItem[];
}

export interface TabItem {
  uri: string;
  text: string;
}

const Tabs = ({ tabs }: TabsProps) => {
  return (
    <div className="bg-white w-fit p-2 rounded-md border border-gray-200 flex">
      {tabs.map(({ uri, text }, i) => (
        <NavLink to={uri} key={i} className={getClassName}>
          {t(`tabs.${text}`)}
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
