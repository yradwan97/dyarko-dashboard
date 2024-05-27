import React from 'react'
import { t } from "i18next";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

interface ExtendPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleExtendAppearanceTime: () => void;
}

const ExtendPostModal = ({isOpen, onClose, handleExtendAppearanceTime}: ExtendPostModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent height="40%">
          <ModalHeader textAlign={"center"} textTransform={"capitalize"}>
            {t("general.extend.extend-appear-time")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontSize={20}>
                {t("general.extend.confirm")}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter gap={3}>
              <Button variant="solid" onClick={handleExtendAppearanceTime}>
                {t("general.confirm")}
              </Button>
              <Button variant={"outline"} onClick={onClose}>
                {t("general.cancel")}
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ExtendPostModal