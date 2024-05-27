import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { RiBarChart2Fill, RiWallet3Fill } from "react-icons/ri";
import SidebarLink from "./SidebarLink";
import { closeSidebar, openSidebar } from "store/sidebar/sidebarSlice";
import logo from "assets/images/logo.png";
import {
  BoxQuestionIcon,
  FileEditIcon,
  HeadPhone,
  InvoiceIcon,
  SettingIcon,
} from "components/shared/icons";
import { useAppDispatch, useAppSelector } from "hooks";
import { ROUTES } from "configs/routes";
import { useMediaQuery } from "@chakra-ui/react";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [smallScreen] = useMediaQuery("(max-width: 30em)")
  const auth = useAppSelector((state) => state.auth);
  const sidebar = useAppSelector((state) => state.sidebar);
  useEffect(() => {
    console.log(sidebar.isActive)
  }, [sidebar.isActive]);
  useEffect(() => {
    console.log("small", smallScreen)
  }, [smallScreen]);
  const sidebarLinks = [
    {
      path: ROUTES.DASHBOARD,
      text: t("layout.sidebar.dashboard"),
      icon: <MdIcons.MdDashboard className="text-[19px]" />
    },
    {
      path: ROUTES.WALLET,
      text: t("layout.sidebar.wallet"),
      icon: <RiWallet3Fill className="text-[19px]" />
    },
    {
      path: ROUTES.REPORTS,
      text: t("layout.sidebar.reports"),
      icon: <RiBarChart2Fill className="text-[19px]" />
    },
    {
      path: ROUTES.REQUESTS,
      text: t("layout.sidebar.requests"),
      icon: <BoxQuestionIcon className="fill-[inherit] stroke-inherit w-5 h-5" />
    },
    {
      path: ROUTES.CONTRACTS,
      text: t("layout.sidebar.contracts"),
      icon: <FileEditIcon className={`fill-[inherit] w-5 h-5`} />
    },
    {
      path: ROUTES.MY_REAL_ESTATE,
      text: t("layout.sidebar.my-real-estates"),
      icon: <InvoiceIcon className={`fill-[inherit] w-5 h-5`} />
    },
  ];

  const bottomSidebarLinks = [
    {
      path: ROUTES.ACCOUNT_SETTINGS,
      text: t("layout.sidebar.settings"),
      icon: <SettingIcon className={`fill-[inherit] w-5 h-5`} />
    },
    {
      path: ROUTES.HELP,
      text: t("layout.sidebar.help"),
      icon: <HeadPhone className={`fill-[inherit] w-5 h-5`} />
    },
  ]

  return (
    <>
      <div
        className={`group bg-white min-h-screen w-[250px] fixed z-40 border-r-2 border-main-100 border-solid md:ml-[0] duration-500 ease-in-out ${!sidebar.isActive && `${smallScreen ? "w-[105px]" : "w-[80px]"}`
          }`}
      >
        <div className="flex items-center justify-between mt-[1.5rem] mx-[1.2rem] mb-[2rem]">
          <div className="flex items-center">
            <button disabled={smallScreen} onClick={() => dispatch(openSidebar())}>
              <img
                className="h-[48px] object-contain"
                src={logo}
                alt="brand logo"
              />
            </button>
            <div
              className={`ms-2 text-lg ${!sidebar.isActive && "hidden"}`}
            >
              <h1 className="text-main-blue font-bold capitalize text-[20px]">
                {auth.user?.name}
              </h1>
              <div className="flex items-center">
                <span className="text-gray-500 text-[11px] font-medium">
                  ({parseFloat(auth.user?.average_rating).toFixed(2)})
                </span>
                <div className="flex items-center ml-[.3rem]">
                  {Array(parseInt(auth.user?.average_rating)).fill("").map((_, index) => (
                    <span key={index} className="text-gray-400 text-[12px]">
                      <AiIcons.AiFillStar />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className={`${!sidebar.isActive && "hidden"}`}
            onClick={() => dispatch(closeSidebar())}
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 32 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.75"
                y="0.75"
                width="30.5"
                height="22.5"
                rx="3.25"
                fill="white"
                stroke="#CCCCD0"
                strokeWidth="1.5"
              />
              <g clipPath="url(#clip0_884_13607)">
              {i18n.language === "en" ? <path
                  d="M24 8L20 12L24 16"
                  stroke="#CCCCD0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                :
              <path
                d="M20 16L24 12L20 8"
                stroke="#CCCCD0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />}
              </g>
              <rect x="4" y="4" width="10" height="16" rx="2" fill="#CCCCD0" />
              <defs>
                <clipPath id="clip0_884_13607">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(14 4)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="mx-[1.2rem]">
          <div className="h-[calc(100vh-240px)] overflow-auto">
            {sidebarLinks.map((link, index) => (
              <SidebarLink
                path={link.path}
                text={link.text}
                icon={link.icon}
                key={index}
              />
            ))}
          </div>
          {bottomSidebarLinks.map((link, index) => (
            <SidebarLink
              path={link.path}
              text={link.text}
              icon={link.icon}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
