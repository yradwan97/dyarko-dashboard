import { InputField, InputGroupWrapper, InputProps } from "./";
import { FormInputSchema } from "types";

export interface InputGroupProps<TFieldName extends string> extends InputProps {
  inputSchema: FormInputSchema<TFieldName>;
  containerClass?: string;
  labelClass?: string;
  label: string;
  inputClass?: string;
}

const InputGroup = <TFieldName extends string>({
  containerClass,
  labelClass,
  label,
  inputClass,
  inputSchema: { id, error, register },
  ...inputProps
}: InputGroupProps<TFieldName>) => {
  const isError = !!error;
  const inputClasses = `${isError ? "focus-visible:border-error border-error" : ""
    } ${inputClass ?? ""}`;

  return (
    <InputGroupWrapper
      label={label}
      id={id}
      error={error}
      containerClass={containerClass}
      labelClasses={labelClass}
    >
      <InputField
        id={id}
        className={inputClasses}
        register={register}
        {...inputProps}
      />
    </InputGroupWrapper>
  );
};

export default InputGroup;
