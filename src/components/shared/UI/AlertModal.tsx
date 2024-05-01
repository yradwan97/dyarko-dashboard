import React, { ReactNode } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Modal, Typography } from "components/shared/UI/index";
import { CheckCircleIcon } from "components/shared/icons";
import { Dialog } from "@headlessui/react";

type IconVariant = "success" | "error";
export type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  variant: IconVariant;
  children: ReactNode;
  className?: string;
};

const AlertModal = ({
  isOpen,
  onClose,
  variant,
  children,
}: AlertModalProps) => {
  const iconsVariants = {
    success: <CheckCircleIcon className="h-12 w-12 stroke-success" />,
    error: <XCircleIcon className="stroke-error h-12 w-12" />,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-3 items-center">
        <Dialog.Title as="div">{iconsVariants[variant]}</Dialog.Title>
        <Typography variant="h4" as="p" className="text-center capitalize">
          {children}
        </Typography>
      </div>
    </Modal>
  );
};

export default AlertModal;
