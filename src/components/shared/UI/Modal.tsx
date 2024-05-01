import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { Backdrop } from "components/shared/UI/index";
import * as FiIcons from "react-icons/fi";
import clsx from "classnames";
import { Button } from "@chakra-ui/react";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: any;
  allowCloseBtn?: boolean;
  className?: string;
  widthCSSClassname?: string
};

const Modal = ({ children, isOpen, onClose, className, allowCloseBtn = true, widthCSSClassname = "w-full" }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-[999]">
        <Backdrop />
        {/* Full-screen scrollable container */}
        <div className="fixed inset-0">
          {/* Container to center the panel */}
          <div className="flex items-start justify-center md:p-4 text-center max-h-full overflow-auto">
            {/* The actual dialog panel  */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`
                ${widthCSSClassname} md:max-w-4xl overflow-y-auto
                transform rounded-2xl bg-white p-6 align-middle shadow-xl transition-all relative
                ${className}
              `}
              >
                {allowCloseBtn && (
                  <div className={"fixed right-8 top-8"}>
                    <Button type="button" onClick={onClose}>
                      <FiIcons.FiX />
                    </Button>
                  </div>
                )}
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
