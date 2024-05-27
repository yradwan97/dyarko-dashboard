import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { t } from "i18next";

import React from "react";

const CustomSpinner = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalHeader position={"absolute"} zIndex={9900} textAlign={"center"}>{t("general.loading")}</ModalHeader>
      <ModalBody position={"absolute"} zIndex={9900}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </ModalBody>
    </Modal>
  );
};

export default CustomSpinner;
