import React from "react";
import { InputGroup, InputProps } from "./";
import { FormInputSchema } from "types";

export interface CheckboxInputProps<TFieldName extends string>
  extends InputProps {
  label: string;
  inputSchema: FormInputSchema<TFieldName>;
}

const CheckboxInput = <TFieldName extends string>({
  inputSchema,
  type,
  ...otherProps
}: CheckboxInputProps<TFieldName>) => {
  return (
    <InputGroup
      type="checkbox"
      inputSchema={inputSchema}
      containerClass="!flex-row items-center !space-y-0 gap-x-2"
      labelClass="order-2"
      inputClass="order-1 w-auto border-2 !border-main-200 appearance-none !p-0 !w-5 h-5 rounded-sm checked:bg-main-500 checked:!border-main-500 after:content-['✓'] flex items-center justify-center after:text-xs after:text-white"
      {...otherProps}
    />
  );
};

export default CheckboxInput;
