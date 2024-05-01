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
import { useGetRefundPolicy } from "features/auth/hooks/useGetRefundPolicy";
import { RefundPolicy } from "features/auth/types/types";
import { t } from "i18next";

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RefundPolicyModal = ({ isOpen, onClose }: RefundPolicyModalProps) => {
  const { policies, isSuccess } = useGetRefundPolicy();
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
        <ModalHeader textAlign={"center"}>{t("general.refund-policy")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {policies?.map((policy: RefundPolicy, index: number) => (
            <Flex wrap={"nowrap"} direction={"column"} margin={2}>
              <Text className="capitalize">{t("general.for")}: {policy.type}</Text>
              <Box
                key={index}
                border="1px solid"
                borderColor="main.600"
                borderRadius={4}
                padding={2}
              >
                <Text>{policy.content}</Text>
                {policy.file ? (
                  <Link
                    href={policy.file}
                    target="_blank"
                    textColor={"main.600"}
                  >
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

export default RefundPolicyModal;
