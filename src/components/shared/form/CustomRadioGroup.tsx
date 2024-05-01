import React from "react";
import { RadioGroup } from "@headlessui/react";
import { CustomRadioOption, InputProps, Label } from "components/shared/form";
import { RadioInputVariant } from "components/shared/form/CustomRadioOption";
import { FormInputSchema } from "types";
import clsx from "classnames";

export interface RadioGroupItem<T> {
  value: T;
  label: string;
  icon?: JSX.Element;
}

export interface CustomRadioGroupProps<
  TValue extends string,
  TFieldName extends string
> extends InputProps {
  label: string;
  value: TValue;
  setValue: React.Dispatch<React.SetStateAction<TValue>>;
  radioGroupItems: any;
  inputSchema: FormInputSchema<TFieldName>;
  isRequired?: boolean;
  className?: string;
  variant?: RadioInputVariant;
  radioClassName?: string;
  hasIndicator?: boolean;
}

const CustomRadioGroup = <TValue extends string, TFieldName extends string>({
  value,
  setValue,
  radioGroupItems,
  className,
  variant,
  inputSchema: { id, register, error },
  radioClassName,
  hasIndicator = true,
  label,
  isRequired,
  ...otherProps
}: CustomRadioGroupProps<TValue, TFieldName>) => {
  const defaultClasses = "flex flex-wrap gap-3";
  const isError = !!error;

  const getRadioOptions = () => {
    return radioGroupItems.map((item: any, index: number) => {
      return (
        <CustomRadioOption
          key={index}
          value={item.value}
          variant={variant}
          label={item.label}
          Icon={item.icon}
          inputSchema={{ id, register, error }}
          className={radioClassName}
          hasIndicator={hasIndicator}
          {...otherProps}
        />
      );
    });
  };

  return (
    <div className="my-4 flex flex-col gap-y-2">
      <Label htmlFor={id}>{label}</Label>
      <RadioGroup
        value={value}
        onChange={setValue}
        className={clsx(defaultClasses, className)}
      >
        {getRadioOptions()}
      </RadioGroup>
      {isError && <p className="text-error">{error?.message}</p>}
    </div>
  );
};

export default CustomRadioGroup;
