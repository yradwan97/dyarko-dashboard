import { ReactNode, TdHTMLAttributes } from "react";

interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

const Td = ({ className, children, ...otherAttrs }: TdProps) => {
  const tdClassName = `text-sm font-medium gray-600 capitalize text-start p-4 ${
    className || ""
  }`.trimEnd();
  return (
    <td className={tdClassName} {...otherAttrs}>
      {children}
    </td>
  );
};

export default Td;
