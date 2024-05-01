import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Map } from 'components/shared/UI'
import { t } from 'i18next'

interface CaravanPickupLocationModalProps {
  isOpen: boolean
  onClose: () => void
  lat: number
  lng: number
}

const CaravanPickupLocationModal = ({isOpen, onClose, lat, lng}: CaravanPickupLocationModalProps) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size={"lg"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent height={"80%"}>
        <ModalHeader textAlign={"center"}>{t("pages.invoices.caravan-pickup-location")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Map latitude={lat} longitude={lng} isDraggable={false} />
        </ModalBody>
        <ModalFooter>
          <Button textTransform={"capitalize"} onClick={onClose}>{t("general.close")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CaravanPickupLocationModal