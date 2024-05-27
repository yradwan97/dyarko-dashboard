import { useDisclosure } from "@chakra-ui/react";
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
import { axiosInstance } from "services/axiosInstance";
import { Optional } from "types";
import ExtendPostModal from "./ExtendPostModal";

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
      <ExtendPostModal isOpen={isOpen} onClose={onClose} handleExtendAppearanceTime={handleExtendAppearanceTime} />
    </PropertyCard>
  );
};

export default PropertyCardWithActions;
