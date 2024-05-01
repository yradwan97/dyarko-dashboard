import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Box,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useGetTermsAndConditions } from "features/auth/hooks/useGetTermsAndConditions";
import { TermsCondition } from "features/auth/types/types";
import { t } from "i18next";

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal = ({
  isOpen,
  onClose,
}: TermsAndConditionsModalProps) => {
  const { terms, isSuccess } = useGetTermsAndConditions();
  return (
    <Modal
      isCentered
      isOpen={isOpen && isSuccess}
      onClose={onClose}
      scrollBehavior="inside"
      size={"lg"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent height={"80%"}>
        <ModalHeader textAlign={"center"}>{t("general.terms-conditions")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {terms?.map((term: TermsCondition, index: number) => (
            <Flex wrap={"nowrap"} direction={"column"} margin={2}>
            <Text className="capitalize">{t("general.for")}: {term.type}</Text>
            <Box
              key={index}
              // margin={2}
              border="1px solid"
              borderColor="main.600"
              borderRadius={4}
              padding={2}
            >
                <Text>{term.content}</Text>
                {term.file ? (
                  <Link href={term.file} target="_blank" textColor={"main.600"}>
                    {t("general.open-file")}
                  </Link>
                ) : null}
            </Box>
              </Flex>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermsAndConditionsModal;
