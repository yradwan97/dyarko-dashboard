import { ReactNode } from "react";

interface BodyTrProps {
  children: ReactNode;
  className?: string;
}

const BodyTr = ({ children, className }: BodyTrProps) => {
  const trClassName = `border-b border-main-100 hover:bg-main-100 ${
    className || ""
  }`.trimEnd();
  return <tr className={trClassName}>{children}</tr>;
};

export default BodyTr;
