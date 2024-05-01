import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Optional } from "types/optional";

export interface FormInputSchema<TFieldName extends string = string> {
  id: TFieldName;
  register: UseFormRegisterReturn<TFieldName>;
  error: Optional<FieldError>;
}
