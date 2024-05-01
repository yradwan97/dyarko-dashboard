import React, { LabelHTMLAttributes } from "react";
import { Typography } from "components/shared/UI";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ children, htmlFor, className, ...otherAttrs }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`select-none block ${className || ""}`}
      {...otherAttrs}
    >
      <Typography variant="body-sm-medium" as="span">
        {children}
      </Typography>
    </label>
  );
};

export default Label;
