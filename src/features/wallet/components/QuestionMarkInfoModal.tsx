import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Typography } from "components/shared/UI";
import { t } from "i18next";
import React from "react";

interface QuestionMarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: string[];
}
const QuestionMarkInfoModal = ({
  isOpen,
  onClose,
  info
}: QuestionMarkModalProps) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size={"lg"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent height={"50%"}>
        <ModalHeader textAlign={"center"}>{t("general.info")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="overflow-y-visible">
          <ul className="mt-4">
            {info?.map((i: string, index: number) => (
              <li key={index} className="text-black mb-1">
                <Typography variant="body-md-medium" as="p">
                  {i}
                </Typography>
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionMarkInfoModal;
