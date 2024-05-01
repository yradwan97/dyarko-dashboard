import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Typography } from "components/shared/UI";
import { t } from "i18next";
import React from "react";

interface WalletQuestionMarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: any;
}
const WalletQuestionMarkModal = ({
  isOpen,
  onClose,
  info,
}: WalletQuestionMarkModalProps) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size={"sm"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent height={"45%"}>
        <ModalHeader textAlign={"center"}>{t("general.info")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col w-full gap-y-1">
            <div className="flex justify-between items-center">
              <Typography
                variant="body-lg-medium"
                as="h3"
                className="text-start gap-x-3"
              >
                {t("pages.wallet.question-mark.wallet.property")}
              </Typography>
              <Typography
                variant="body-md-medium"
                as="h4"
                className="text-end text-main-600 gap-x-3"
              >
                <span>{t("general.dinar")}</span>{" "}
                {info?.pricing?.upload_property}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography
                variant="body-lg-medium"
                as="h3"
                className="text-start gap-x-3"
              >
                <span className="capitalize">
                  {t("pages.wallet.question-mark.wallet.video")}
                </span>
              </Typography>
              <Typography
                variant="body-md-medium"
                as="h4"
                className="text-end text-main-600 gap-x-3"
              >
                <span>{t("general.dinar")}</span> {info?.pricing?.upload_video}
              </Typography>
            </div>
            {info.features?.map((i: any, index: number) => (
            <div className="flex justify-between items-center">
              <Typography
                variant="body-lg-medium"
                as="h3"
                className="text-start gap-x-3"
              >
                <span className="capitalize">
                {t(`pages.wallet.question-mark.wallet.${i?.feature_type}`)}
                </span>
              </Typography>
              <Typography
                variant="body-md-medium"
                as="h4"
                className="text-end text-main-600 gap-x-3"
              >
                <span>{t("general.dinar")}</span> {i.amount}
              </Typography>
            </div>))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletQuestionMarkModal;
