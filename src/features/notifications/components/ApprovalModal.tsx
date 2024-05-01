import React from "react";
import { Notification } from "../types/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import i18next, { t } from "i18next";
import { axiosInstance } from "services/axiosInstance";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification;
  onRead: (id: string) => void
}

const ApprovalModal = ({
  isOpen,
  onClose,
  notification,
  onRead
}: ApprovalModalProps) => {
  const toast = useToast({ position: "top", colorScheme: "blue" });

  const handleDenyRequest = () => {
    updateRequest("rejected");
  };
  const handleAcceptRequest = () => {
    updateRequest("approved");
  };

  const updateRequest = async (status: string) => {
    let endpoint =
      notification.type === "disclaimer"
        ? "disclaimer"
        : "additional_service_requests";
    let updateBody = { status };
    let id =
      notification.type === "disclaimer"
        ? notification.disclaimer
        : notification.additional_service_id;
    try {
      await axiosInstance.put(`/${endpoint}/${id}`, updateBody);
      toast({
        title: "Success",
        description: `${t(
          `pages.notifications.action.${
            notification.type === "disclaimer"
              ? "disclaimer"
              : "additional_service"
          }.${status === "approved" ? "accept" : "deny"}.success`
        )}`,
      });
      onRead(notification._id)
    } catch (e) {
      console.error(e);
      toast({
        title: "Failed",
        description: `${t(
          `pages.notifications.action.disclaimer.${
            status === "approved" ? "accept" : "deny"
          }.fail`
        )}`,
      });
    }
    onClose();
  };
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size={"lg"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent height={"40%"}>
        <ModalHeader textAlign={"center"}>
          {t(`pages.notifications.action.${notification?.type}.title`)}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text className="capitalize" fontSize={20}>
            {i18next.language === "ar"
              ? notification?.title_ar
              : notification?.title_en}
          </Text>
          <hr />
          <Text className="capitalize" fontSize={20}>
            {i18next.language === "ar"
              ? notification?.body_ar
              : notification?.body_en}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAcceptRequest}>{t("general.accept")}</Button>
          <Button onClick={handleDenyRequest}>{t("general.deny")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApprovalModal;
