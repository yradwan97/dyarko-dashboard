import {
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
import { PropertyService } from "features/properties";
import { t } from "i18next";
import { TbStatusChange } from "react-icons/tb";

interface RequestedServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: PropertyService[];
}

const RequestedServicesModal = ({
  isOpen,
  onClose,
  services,
}: RequestedServicesModalProps) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent height="65%" className="overflow-y-auto">
        <ModalHeader textAlign={"center"}>
          {t("pages.invoices.requested-services")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {services?.map((service, index) => (
            <div
              key={index}
              className="flex gap-x-4 border border-main-500 items-center rounded-lg p-2"
            >
              <TbStatusChange size={"30px"} />
              <div className="flex flex-col w-full gap-y-3 justify-between">
                <div className="flex w-full justify-between px-3">
                  <Text textTransform={"capitalize"} textAlign={"start"}>
                    {t("pages.properties.create.service.name")}
                  </Text>
                  <Text
                    textTransform={"capitalize"}
                    textColor={"main-yellow.600"}
                    textAlign={"end"}
                  >
                    {service.name}
                  </Text>
                </div>
                <div className="flex w-full justify-between px-3">
                  <Text textTransform={"capitalize"}>
                    {t("pages.properties.create.service.price")}
                  </Text>
                  <Text
                    textTransform={"capitalize"}
                    fontWeight={"semibold"}
                    textColor={"main-yellow.600"}
                    textAlign={"end"}
                  >
                    {t("general.dinar")} {service.price}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{t("general.ok")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestedServicesModal;
