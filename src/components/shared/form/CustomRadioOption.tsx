import React from "react";
import { RadioGroup } from "@headlessui/react";
import { Typography } from "components/shared/UI";
import {
  InputField,
  InputProps,
  RadioGroupIndicator,
} from "components/shared/form";
import clsx from "classnames";
import { FormInputSchema } from "types";

export enum RadioInputVariant {
  MAIN = "main",
  YELLOW = "yellow",
}

export interface CustomRadioOptionProps<
  TValue extends string,
  TFieldName extends string
> extends InputProps {
  value: TValue;
  label: string;
  inputSchema: FormInputSchema<TFieldName>;
  Icon?: JSX.Element;
  variant?: RadioInputVariant;
  hasIndicator?: boolean;
  className?: string;
}

const CONTAINER_GAP = 3;

const variantsStyles = {
  [RadioInputVariant.MAIN]: {
    checked: "border-2 bg-main-100 border-main-600",
    unchecked: "border-2 bg-white border-gray-200",
  },
  [RadioInputVariant.YELLOW]: {
    checked: "border-2 bg-main-yellow-200 border-main-yellow-600",
    unchecked: "border-2 bg-main-yellow-300 border-main-yellow-600 opacity-50",
  },
};

const CustomRadioOption = <TValue extends string, TFieldName extends string>({
  value,
  Icon,
  label,
  variant,
  className,
  hasIndicator = true,
  inputSchema,
  ...otherProps
}: CustomRadioOptionProps<TValue, TFieldName>) => {
  const defaultClasses = clsx(
    "rounded-xl",
    "flex",
    "items-center",
    "w-full",
    "p-4",
    `gap-${CONTAINER_GAP}`,
    "cursor-pointer"
  );

  const getClasses = (checked: boolean) => {
    return clsx(
      defaultClasses,
      variant && {
        [variantsStyles[variant]?.checked]: checked,
        [variantsStyles[variant]?.unchecked]: !checked,
      },
      className
    );
  };

  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <RadioGroup.Label as="label" className={getClasses(checked)}>
          {hasIndicator ? (
            <RadioGroupIndicator isChecked={checked} variant={variant} />
          ) : null}
          <div
            className={`flex flex-col items-center gap-${CONTAINER_GAP} ${
              !hasIndicator ? "flex-1" : ""
            }`}
          >
            {Icon}
            <Typography variant="body-sm-bold" as="span" className="capitalize">
              {label}
            </Typography>
            <InputField
              type="radio"
              register={inputSchema.register}
              className="hidden"
              value={value}
              id={inputSchema.id}
              {...otherProps}
            />
          </div>
        </RadioGroup.Label>
      )}
    </RadioGroup.Option>
  );
};

export default CustomRadioOption;
