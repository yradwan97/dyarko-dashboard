import React from "react";
import { RadioInputVariant } from "components/shared/form";
import clsx from "classnames";

export interface RadioGroupIndicatorProps {
  isChecked: boolean;
  variant?: RadioInputVariant;
}

const RadioGroupIndicator = ({
  isChecked,
  variant = RadioInputVariant.MAIN,
}: RadioGroupIndicatorProps) => {
  const variantsStyles = {
    [RadioInputVariant.MAIN]: "main-600",
    [RadioInputVariant.YELLOW]: "main-yellow-600",
  };

  return (
    <div
      className={clsx(
        "flex",
        "h-5",
        "w-5",
        "items-center",
        "justify-center",
        "rounded-full",
        "border p-0.5",
        `border-${variantsStyles[variant]}`
      )}
    >
      {isChecked ? (
        <div
          className={clsx(
            "h-3",
            "w-3",
            "rounded-full",
            `bg-${variantsStyles[variant]}`
          )}
        ></div>
      ) : null}
    </div>
  );
};

export default RadioGroupIndicator;
