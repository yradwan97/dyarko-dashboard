import React from "react";
import { Typography } from "components/shared/UI";
import { t } from "i18next";

const NotFound = () => {
  return (
    <Typography className="text-center" as="h1" variant="h1">
      {t("not-found")}
    </Typography>
  );
};

export default NotFound;
