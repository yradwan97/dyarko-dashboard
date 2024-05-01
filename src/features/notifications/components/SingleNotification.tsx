import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Notification } from "../types/types";
import { Typography } from "components/shared/UI";
import i18next, { t } from "i18next";

interface SingleNotificationProps {
  notification: Notification;
  onClickNotification: (id: string) => void;
  index: number;
}

const getNotificationColor = (index: number) => {
  if (index % 3 === 0) return "bg-red";
  else if (index % 2 === 0) return "bg-main-600";
  else return "bg-main-yellow-600";
};

const SingleNotification = ({
  notification,
  index,
  onClickNotification,
}: SingleNotificationProps) => {
  return (
    <div
      onClick={() => onClickNotification(notification._id)}
      className={`flex flex-row gap-x-4 hover:bg-main-100 ${
        !notification?.is_read ? `bg-main-200 cursor-pointer` : ""
      } border-b rounded-md mx-1 border-gray-300 px-5 py-3 last:border-b-0`}
    >
      <div className="flex items-center rtl:me-2">
        <span
          className={`w-10 h-10 rounded-full ${getNotificationColor(
            index
          )} flex justify-center items-center`}
        >
          <AiFillHome className="text-lg text-white" />
        </span>
      </div>
      <div className="flex-col space-y-2">
        <Typography
          variant="body-sm-bold"
          as="h6"
          className="text-black capitalize"
        >
          {i18next.language === "en"
            ? notification?.title_en
            : notification.title_ar}
        </Typography>
        <Typography variant="body-xs-bold" as="p" className="text-gray-600">
          {i18next.language === "en"
            ? notification?.body_en
            : notification.body_ar}
        </Typography>
        {notification?.property && (
          <Typography variant="body-xs-medium" as="p" className="text-gray-600">
            {t("pages.notifications.rent-modal.property")}{" "}
            {notification?.property.title}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SingleNotification;
