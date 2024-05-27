import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Tooltip, useMediaQuery } from "@chakra-ui/react";
import { useAppSelector } from "hooks";

const SidebarLink = (props) => {
  const { path, text, icon } = props;
  const [smallScreen] = useMediaQuery("(max-width: 30em)")
  const sidebar = useAppSelector((state) => state.sidebar);

  const getSidebarLinkTextAndVisibility = () => {
    const isHidden = !smallScreen && !sidebar.isActive
    const size = !sidebar.isActive ? "text-[.65rem]" : "text-[.85rem]"
    return `${isHidden && "hidden"} ${size}`
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `mb-[.6rem] px-[.8rem] py-[.5rem] flex items-center ${!sidebar.isActive && "flex-col justify-center"} rounded-[8px] ${isActive
          ? "bg-main-100 text-main-600 fill-main-600"
          : "text-gray-400 fill-gray-400"
        }`
      }
    >
      <Tooltip>
        <span>{icon}</span>
      </Tooltip>
      <span
        className={`${getSidebarLinkTextAndVisibility()} mx-[.8rem] ${smallScreen && "text-center"} capitalize font-bold`}
      >
        {text}
      </span>
    </NavLink>
  );
};

export default SidebarLink;
