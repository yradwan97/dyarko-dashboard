import { Menu } from "@headlessui/react";
import { ReactNode } from "react";

export interface MenuButtonProps {
  children: ReactNode;
}

const MenuButton = ({ children }: MenuButtonProps) => {
  return <Menu.Button>{children}</Menu.Button>;
};

export default MenuButton;
