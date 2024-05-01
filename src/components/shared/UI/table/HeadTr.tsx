import { ReactNode } from "react";

interface HeadTrProps {
  children: ReactNode;
  className?: string;
}

const HeadTr = ({ children, className }: HeadTrProps) => {
  const trClassName = `border-t border-b border-gray-200 ${
    className || ""
  }`.trimEnd();
  return <tr className={trClassName}>{children}</tr>;
};

export default HeadTr;
