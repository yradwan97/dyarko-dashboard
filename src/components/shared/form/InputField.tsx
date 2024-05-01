import React from "react";
import { Input, InputProps } from "components/shared/form";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps<TFieldName extends string> extends InputProps {
  register: UseFormRegisterReturn<TFieldName>;
}

const InputField = <InputField extends string>({
  id,
  className,
  register,
  ...inputProps
}: InputFieldProps<InputField>) => {
  return <Input id={id} className={className} {...register} {...inputProps} />;
};

export default InputField;
