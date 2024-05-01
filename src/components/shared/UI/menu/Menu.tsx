import {
  Menu as HeadlessMenu,
  MenuProps as HeadllessMenuProps,
} from "@headlessui/react";
import { DropDownTransition } from "components/shared/transitions";

export interface MenuProps extends HeadllessMenuProps<any> {
  children: typeof HeadlessMenu.Item;
  menuButton: JSX.Element;
}

const Menu = ({ children, menuButton }: MenuProps) => {
  return (
    <HeadlessMenu as="div" className="relative inline-block text-left">
      <div>{menuButton}</div>
      <DropDownTransition>
        <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </HeadlessMenu.Items>
      </DropDownTransition>
    </HeadlessMenu>
  );
};

export default Menu;
