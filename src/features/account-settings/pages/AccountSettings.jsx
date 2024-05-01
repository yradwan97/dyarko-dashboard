import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Typography } from "components/shared/UI";
import { ROUTES } from "configs/routes";
import { t } from "i18next";

const navLinks = [
  { uri: ROUTES.PROFILE, text: "profile" },
  { uri: ROUTES.REVIEWS, text: "my-reviews" },
  { uri: ROUTES.MY_ACCOUNT, text: "my-account" },
  { uri: ROUTES.BANK_ACCOUNT, text: "bank-account" },
  { uri: ROUTES.AVAILABLE_TIME, text: "available-time" },
  { uri: ROUTES.REFUND_POLICY, text: "my-refund-policies" }
];

const activeClass = "text-black border-l-3 border-main-600 py-4 px-5 block";
const defaultLinkClass =
  "text-gray-700 border-l-3 border-main-100 py-4 px-5 block";

const AccountSettings = () => {
  return (
    <div className="grid grid-cols-4 gap-x-10">
      <ul className="col-span-1 divide-y divide-gray-200">
        {navLinks.map((navLink, i) => (
          <li key={i}>
            <NavLink
              to={navLink.uri}
              className={({ isActive }) =>
                isActive ? activeClass : defaultLinkClass
              }
            >
              <Typography
                variant="body-md-medium"
                as="span"
                className="capitalize"
              >
                {t(`pages.settings.tabs.${navLink.text}`)}
              </Typography>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="col-span-3 bg-white rounded-lg p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountSettings;
