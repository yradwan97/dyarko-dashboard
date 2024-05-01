import { t } from "i18next";
import React from "react";
import { BsEye } from "react-icons/bs";
import { Optional } from "types/optional";

type ViewsBadgeProps = {
  views: Optional<number>;
};

function ViewsBadge({ views }: ViewsBadgeProps) {
  return (
    <div className="absolute bg-white py-1 px-3 rounded-full top-2 left-2 flex gap-x-2">
      <BsEye className="text-xl text-main-600 me-2" />
      <span className="text-sm font-medium text-main-600">{views || 0} {t("general.videos.views")}</span>
    </div>
  );
}

export default ViewsBadge;
