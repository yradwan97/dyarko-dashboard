import { Menu } from "@headlessui/react";
import { DropDownTransition } from "components/shared/transitions";
import { Typography } from "components/shared/UI";
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { GrUpgrade } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdMoreTime } from "react-icons/md";
import clsx from "classnames";
import { FaRegEdit } from "react-icons/fa";
import { t } from "i18next";

export interface PropertyActionsMenuProps {
  isPromoted: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onUpgrade?: () => void;
  onExtend?: () => void
}

const PropertyActionsMenu = ({
  isPromoted,
  onUpgrade,
  onEdit,
  onDelete,
  onExtend
}: PropertyActionsMenuProps) => {
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button className="text-xl text-bold">
        <EllipsisVerticalIcon className="w-6" />
      </Menu.Button>
      <DropDownTransition>
        <Menu.Items
          className={clsx(
            "absolute",
            "ltr:right-0",
            "rtl:left-0",
            "top-full",
            "mt-2",
            "w-48",
            "divide-y",
            "divide-main-100",
            "rounded-md",
            "bg-white",
            "shadow-lg",
            "ring-1",
            "ring-black",
            "ring-opacity-5",
            "focus:outline-none"
          )}
        >
          {isPromoted ? (
            <Menu.Item as="div" className="p-2">
              {({ active }) => (
                <button
                  className={clsx(
                    "group",
                    "text-black",
                    "flex",
                    "w-full",
                    "items-center",
                    "rounded-md",
                    "px-4",
                    "py-2.5",
                    "gap-x-3",
                    "text-sm",
                    "capitalize",
                    {
                      "bg-main-200": active,
                    }
                  )}
                  onClick={onUpgrade}
                >
                  <GrUpgrade className="w-5 h-5 text-red" />
                  <Typography
                    variant="body-md-medium"
                    as="span"
                    className="text-inherit"
                  >
                    {t("general.upgrade")}
                  </Typography>
                </button>
              )}
            </Menu.Item>
          ) : null}
          <Menu.Item as="div" className="p-2">
            {({ active }) => (
              <button
                className={clsx(
                  "group",
                  "text-black",
                  "flex",
                  "w-full",
                  "items-center",
                  "rounded-md",
                  "px-4",
                  "py-2.5",
                  "gap-x-3",
                  "text-sm",
                  "capitalize",
                  {
                    "bg-main-200": active,
                  }
                )}
                onClick={onEdit}
              >
                <FaRegEdit className="w-5 h-5 text-gray-500" />
                <Typography
                  variant="body-md-medium"
                  as="span"
                  className="text-inherit"
                >
                  {t("general.edit")}
                </Typography>
              </button>
            )}
          </Menu.Item>
          <Menu.Item as="div" className="p-2">
            {({ active }) => (
              <button
                className={clsx(
                  "group",
                  "text-black",
                  "flex",
                  "w-full",
                  "items-center",
                  "rounded-md",
                  "px-4",
                  "py-2.5",
                  "gap-x-3",
                  "text-sm",
                  "capitalize",
                  {
                    "bg-main-200": active,
                  }
                )}
                onClick={onExtend}
              >
                <MdMoreTime className="w-6 h-6 text-green" />
                <Typography
                  variant="body-md-medium"
                  as="span"
                  className="text-inherit"
                >
                  {t("general.extend.extend")}
                </Typography>
              </button>
            )}
          </Menu.Item>
          <Menu.Item as="div" className="p-2">
            {({ active }) => (
              <button
                className={clsx(
                  "group",
                  "text-black",
                  "flex",
                  "w-full",
                  "items-center",
                  "rounded-md",
                  "px-4",
                  "py-2.5",
                  "gap-x-3",
                  "text-sm",
                  "capitalize",
                  {
                    "bg-main-200": active,
                  }
                )}
                onClick={onDelete}
              >
                <RiDeleteBin6Line className="w-5 h-5 text-error" />
                <Typography
                  variant="body-md-medium"
                  as="span"
                  className="text-inherit"
                >
                  {t("general.delete")}
                </Typography>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </DropDownTransition>
    </Menu>
  );
};

export default PropertyActionsMenu;
