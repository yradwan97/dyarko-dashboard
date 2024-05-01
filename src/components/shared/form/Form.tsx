import React, { FormHTMLAttributes, ReactNode } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface FormProps<T extends FieldValues>
  extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  formHandleSubmit?: UseFormHandleSubmit<T>;
  submitHandler?: (data: T) => void;
}

const Form = <T extends FieldValues>({
  children,
  formHandleSubmit,
  submitHandler,
  onSubmit,
}: FormProps<T>) => {
  const handleSubmit =
    formHandleSubmit && submitHandler
      ? formHandleSubmit(submitHandler)
      : onSubmit;
  return (
    <form onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  );
};

export default Form;
