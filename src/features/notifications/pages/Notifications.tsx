import React, { useEffect, useState } from "react";
import Paginator from "components/shared/pagination/Paginator";
import { Button, Typography } from "components/shared/UI";
import { ButtonVariant } from "components/shared/UI/buttons";
import { useAppSelector } from "hooks";
import SingleNotification from "../components/SingleNotification";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { axiosInstance } from "services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import scrollToTop from "utils/scrollToTop";
import { t } from "i18next";
import { Notification } from "../types/types";
import { useDisclosure } from "@chakra-ui/react";
import ApprovalModal from "../components/ApprovalModal";

const Notifications = () => {
  const navigate = useNavigate();
  const notifications = useAppSelector((state) => state.notifications);
  const [page, setPage] = useState(1);
  const { refetch, isRefetching } = useGetNotifications(page);
  const [approvalNotification, setApprovalNotification] = useState<Notification>()
  const {isOpen, onOpen, onClose} = useDisclosure()
  useEffect(() => {
    scrollToTop();
  }, [page]);

  const handleReadAllNotifications = async () => {
    let readAllBody = {
      is_read: true,
    };

    try {
      let res = await axiosInstance.put(
        "/notifications/update_all",
        readAllBody
      );
      if (res.data.success) {
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };


  const updateNotificationIsRead = async (id: string) => {
    let body = {
      is_read: true,
    };
    try {
      let res = await axiosInstance.put(`/notifications/${id}`, body);
      if (res.data.success) {
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotificationClick = (id: string) => {
    const selectedNotification = notifications.notifications.find(
      (n) => n._id === id
    );
    switch (selectedNotification?.type) {
      case "property":
        navigate(ROUTES.DASHBOARD);
        break;
      case "tour":
        navigate(ROUTES.TOUR_REQUESTS);
        break;
      case "video":
        navigate(ROUTES.VIDEOS);
        break;
      case "comment":
        navigate(ROUTES.VIDEOS);
        break;
      case "like":
        navigate(ROUTES.VIDEOS);
        break;
      case "installment":
        navigate(ROUTES.INSTALLMENT_REQUESTS);
        break;
      case "rent":
        navigate(ROUTES.MY_REAL_ESTATE);
        break;
      case "end_contract":
        navigate(ROUTES.MY_REAL_ESTATE);
        break;
      case "extend_invoice":
        navigate(ROUTES.MY_REAL_ESTATE);
        break;
      case "disclaimer":
        setApprovalNotification(selectedNotification)
        onOpen()
        break;
      case "additional_service":
        setApprovalNotification(selectedNotification)
        onOpen()
        break;
      case "invoices":
        navigate(ROUTES.MY_REAL_ESTATE);
        break;
    }
    if (
      !selectedNotification!.is_read &&
      selectedNotification!.type !== "disclaimer" &&
      selectedNotification!.type !== "additional_service"
    ) {
      updateNotificationIsRead(id);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="w-1/2 flex items-center gap-x-72 px-3">
        <div className="flex items-center justify-start">
          <Typography
            variant="body-lg-bold"
            as="h1"
            className="text-black text-start capitalize"
          >
            {t("pages.notifications.notifications")}
          </Typography>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant={ButtonVariant.PRIMARY}
            className="capitalize"
            disabled={
              notifications?.notifications.every((n) => n.is_read) ||
              isRefetching
            }
            onClick={handleReadAllNotifications}
          >
            {t("pages.notifications.read-all")}
          </Button>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg w-[330px] md:w-[500px] min-h-[200px] space-y-3 px-2 py-3">
        {notifications && notifications.notifications.length > 0 ? (
          notifications.notifications.map((n, index) => (
            <SingleNotification
              key={index}
              index={index}
              notification={n}
              onClickNotification={(id) =>
                handleNotificationClick(id)
              }
            />
          ))
        ) : (
          <Typography
            variant="body-md-bold"
            as="h4"
            className="text-center text-gray-500"
          >
            {t("pages.notifications.none")}
          </Typography>
        )}
      </div>
      <Paginator
        lastPage={notifications?.pages! | 0}
        page={page}
        onChange={(e) => setPage(e)}
      />
      <ApprovalModal isOpen={isOpen} onClose={onClose} notification={approvalNotification!} onRead={(id: string) => updateNotificationIsRead(id)} />
    </div>
  );
};

export default Notifications;
