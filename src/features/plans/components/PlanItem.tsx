import { AiFillCheckCircle } from "react-icons/ai";
import { Typography } from "components/shared/UI";
import { ReactNode } from "react";

export interface PlanItemProps {
  children: ReactNode;
  disabled?: boolean;
}

const PlanItem = ({ disabled = false, children }: PlanItemProps) => {
  return (
    <div className="flex gap-x-4">
      <AiFillCheckCircle
        className={`${disabled ? "text-gray-400" : "text-[#3CEBC1]"} text-2xl`}
      />
      <Typography
        variant="body-sm-medium"
        as="span"
        className={`${
          disabled ? "text-gray-400 line-through" : "text-gray-700"
        } capitalize`}
      >
        {children}
      </Typography>
    </div>
  );
};

export default PlanItem;
