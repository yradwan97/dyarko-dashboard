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
import { useGetPrivacyPolicy } from "features/auth/hooks/useGetPrivacyPolicy";
import { PrivacyPolicy } from "features/auth/types/types";
import { t } from "i18next";

interface PrivacyPoliciesModalProps {
    isOpen: boolean;
    policies: PrivacyPolicy[] | undefined
    isSuccess: boolean
    onClose: () => void;
  }

const PrivacyPoliciesModal = ({isOpen, policies, isSuccess, onClose}: PrivacyPoliciesModalProps) => {
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
        <ModalHeader textAlign={"center"}>{t("general.privacy-policy")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {policies?.map((policy: PrivacyPolicy, index: number) => (
            <Flex wrap={"nowrap"} direction={"column"} margin={2}>
            <Text className="capitalize">{t("general.for")}: {policy.type}</Text>
            <Box
              key={index}
              // margin={2}
              border="1px solid"
              borderColor="main.600"
              borderRadius={4}
              padding={2}
            >
                <Text>{policy.content}</Text>
                {policy.file ? (
                  <Link href={policy.file} target="_blank" textColor={"main.600"}>
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
  )
}

export default PrivacyPoliciesModal