import React from "react";
import { Spinner } from "components/shared/UI/index";
import { t } from "i18next";

type LoaderProps = {
  isFullScreen?: boolean;
};

const Loader = ({ isFullScreen = true }: LoaderProps) => {
  const loaderClassName = `${
    isFullScreen ? "fixed" : "absolute"
  } top-0 left-0 z-50 flex flex-col h-full w-full items-center justify-center bg-main-400 bg-opacity-50 space-y-6`;
  return (
    <div className={loaderClassName}>
      <h1 className="text-white">{t("general.loading")}</h1>
      <Spinner />
    </div>
  );
};

export default Loader;
