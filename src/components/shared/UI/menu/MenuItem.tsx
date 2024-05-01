import { Menu } from "@headlessui/react";
import { ReactNode } from "react";

export interface MenuItemProps {
  children: ReactNode;
}

const MenuItem = ({ children }: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-violet-500 text-white" : "text-gray-900"
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
