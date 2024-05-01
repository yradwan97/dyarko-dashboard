import { ReactNode, ThHTMLAttributes } from "react";

interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

const Th = ({ className, children, ...attrs }: ThProps) => {
  const thClassName =
    `flex-1 text-md font-bold text-gray-500 text-start capitalize p-4 ${
      className || ""
    }`.trimEnd();
  return (
    <th className={thClassName} {...attrs}>
      {children}
    </th>
  );
};

export default Th;
