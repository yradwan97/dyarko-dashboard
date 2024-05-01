import { Menu } from "@headlessui/react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Typography } from "components/shared/UI";
import { DropDownTransition } from "components/shared/transitions";
import { t } from "i18next";

const RequestsActionsMenu = ({ handleStatusChange }: any) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="text-xl text-bold"
      >
        ...
      </Menu.Button>
      <DropDownTransition>
        <Menu.Items
          className="absolute z-50 ltr:right-0 rtl:left-0 top-full mt-2 w-44 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item as="div" className="p-2">
            {({ active }) => (
              <button
                className={`${active ? "bg-[#3CEBC1]/10 text-[#3CEBC1]" : "text-gray-500"
                  } group flex w-full items-center rounded-md px-4 py-2.5 gap-x-3 text-sm capitalize`}
                onClick={() => handleStatusChange("approved")}
              >
                <AiOutlineCheckCircle className="text-inherit text-xl fill-green" />
                <Typography
                  variant="body-md-medium"
                  as="span"
                  className="text-inherit"
                >
                  {t("general.approved")}
                </Typography>
              </button>
            )}
          </Menu.Item>
          <Menu.Item as="div" className="p-2">
            {({ active }) => (
              <button
                className={`${active
                  ? "bg-main-orange-100 text-main-orange-600"
                  : "text-gray-500"
                  } group flex w-full items-center rounded-md px-4 py-2 gap-x-3 text-sm capitalize`}
                onClick={() => handleStatusChange("rejected")}
              >
                <AiOutlineCloseCircle className="text-inherit text-xl fill-red" />
                <Typography
                  variant="body-md-medium"
                  as="span"
                  className="text-inherit"
                >
                  {t("general.rejected")}
                </Typography>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </DropDownTransition>
    </Menu>
  );
};

export default RequestsActionsMenu;
