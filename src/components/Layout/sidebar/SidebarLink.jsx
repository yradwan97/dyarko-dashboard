import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";

const SidebarLink = (props) => {
  const { path, text, icon } = props;

  const sidebar = useSelector((state) => state.sidebar);

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `mb-[.6rem] px-[.8rem] py-[.5rem] flex items-center rounded-[8px] ${isActive
          ? "bg-main-100 text-main-600 fill-main-600"
          : "text-gray-400 fill-gray-400"
        }`
      }
    >
      <Tooltip>
        <span>{icon}</span>
      </Tooltip>
      <span
        className={`text-[.85rem] mx-[.8rem] capitalize font-bold ${sidebar.isActive && "hidden"
          }`}
      >
        {text}
      </span>
    </NavLink>
  );
};

export default SidebarLink;
