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
  useDisclosure,
} from "@chakra-ui/react";
import { PromoteButton } from "components/shared/UI/buttons";
import {
  Property,
  PropertyActionsMenu,
  PropertyCard,
  setEditProperty,
  toggleActiveEditPropertyModal,
  usePropertyActions,
} from "features/properties";
import { useAppDispatch } from "hooks";
import { t } from "i18next";
import { axiosInstance } from "services/axiosInstance";
import { Optional } from "types";

interface PropertyCardWithActionsProps {
  property: Optional<Property>;
}

const PropertyCardWithActions = ({
  property,
}: PropertyCardWithActionsProps) => {
  const dispatch = useAppDispatch()
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteProperty } = usePropertyActions();

  const handlePropertyDeletion = async () => {
    await deleteProperty(property?._id || "");
  };

  const handlePropertyEdit = () => {
    console.log(property)
    dispatch(toggleActiveEditPropertyModal())
    dispatch(setEditProperty(property))
  };

  const handlePropertyPromotionUpgrade = () => {};

  const handleOpen = () => {
    onOpen()
  }

  const handleExtendAppearanceTime = async () => {
    try {
      const res = await axiosInstance.post("/properties/extend", {property: property?._id})
    } catch (e) {
      console.error("error",e)
    }
  };

  return (
    <PropertyCard property={property}>
      <div className="flex flex-wrap items-center text-gray-400">
        <PromoteButton propertyId={property?._id} />
        <PropertyActionsMenu
          isPromoted={false}
          onDelete={handlePropertyDeletion}
          onEdit={handlePropertyEdit}
          onUpgrade={handlePropertyPromotionUpgrade}
          onExtend={handleOpen}
        />
      </div>
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
    </PropertyCard>
  );
};

export default PropertyCardWithActions;
