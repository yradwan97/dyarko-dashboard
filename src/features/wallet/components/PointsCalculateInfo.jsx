import React from "react";
import { Button, Modal, Typography } from "components/shared/UI";
import { MdOutlineClose } from "react-icons/md";
import { t } from "i18next";

function PointsCalculateInfo({ isOpen, setIsOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="md:max-w-xl rounded-md">
      <div className="bg-white rounded-lg">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <Typography variant="h5" as="h5" className="text-black">
            {t("pages.wallet.points.question-mark")}
          </Typography>
          <MdOutlineClose
            className="text-xl text-gray-500 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-6">
          <Typography
            variant="body-sm"
            as="p"
            className="text-black mb-6 text-justify"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
            potenti tincidunt aliquam scelerisque purus, pharetra arcu. Amet
            porttitor ipsum, odio sit ultricies nam. Purus vel sed molestie
            scelerisque ac sit sed sed. Erat quam pretium, elementum consequat
            metus mauris. Et leo pretium amet pulvinar arcu condimentum eget
            arcu. Netus nulla fames leo enim nibh.
          </Typography>
          <Button
            variant="primary"
            className="w-full mt-6"
            onClick={onClose}
          >
            {t("pages.wallet.points.got-it")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default PointsCalculateInfo;
