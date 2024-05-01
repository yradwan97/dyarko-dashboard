import React from "react";
import reportImg from "assets/images/report.png";
import { Typography } from "components/shared/UI";
import { t } from "i18next";

function NoReports() {
  return (
    <div className="container flex h-full flex-col items-center justify-center px-14 py-10 lg:flex">
      <img src={reportImg} className="w-5/6 md:w-3/12" alt="login-pic" />
      <Typography
        variant="h4"
        as="h4"
        className="text-black !font-bold text-center mt-6 mb-4"
      >
        {t("pages.reports.no-reports.1")}
      </Typography>
      <Typography
        variant="body-md-medium"
        as="p"
        className="text-gray-500 text-center"
      >
        {t("pages.reports.no-reports.2")}
      </Typography>
    </div>
  );
}

export default NoReports;
