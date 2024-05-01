import { TextareaHTMLAttributes } from "react";
import { Label, TextAreaField } from "components/shared/form";
import { FormInputSchema } from "types";

export interface TextAreaGroupProps<TFieldName extends string>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClass?: string;
  labelClass?: string;
  label: string;
  textAreaClass?: string;
  inputSchema: FormInputSchema<TFieldName>;
}

const TextAreaGroup = <TFieldName extends string>({
  containerClass,
  labelClass,
  label,
  textAreaClass,
  inputSchema: { id, error, register },
  ...otherInputProps
}: TextAreaGroupProps<TFieldName>) => {
  const isError = !!error;
  const textAreaClasses = `${
    isError ? "focus-visible:border-error border-error" : ""
  } ${textAreaClass ?? ""}`;

  return (
    <div className={`mb-4 flex flex-col gap-y-2 ${containerClass ?? ""}`}>
      <Label htmlFor={id} className={labelClass}>
        {label}
      </Label>
      <TextAreaField
        id={id}
        className={textAreaClasses}
        register={register}
        {...otherInputProps}
      />

      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
};

export default TextAreaGroup;
