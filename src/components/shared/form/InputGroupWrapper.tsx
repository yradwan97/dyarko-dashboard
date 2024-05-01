import clsx from "classnames";
import { Label } from "components/shared/form/index";
import React from "react";
import { FieldError } from "react-hook-form";
import { Optional } from "types";

export interface InputGroupWrapperProps {
  children: JSX.Element;
  label: string;
  id: string;
  error: Optional<FieldError>;
  containerClass?: string;
  labelClasses?: string;
}

const InputGroupWrapper = ({
  id,
  label,
  children,
  error,
  containerClass,
  labelClasses,
}: InputGroupWrapperProps) => {
  const isError = !!error;
  return (
    <div
      className={clsx("mb-4", "flex", "flex-col", "gap-y-2", containerClass)}
    >
      <Label htmlFor={id} className={labelClasses}>
        {label}
      </Label>
      {children}
      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
};

export default InputGroupWrapper;
