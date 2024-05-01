import React, { ButtonHTMLAttributes } from "react";

export enum ButtonVariant {
  PRIMARY = "primary",
  PRIMARY_OUTLINE = "primaryOutline",
  PRIMARY_INVERSE = "primaryInverse",
}

const DEFAULT_VARIANT = ButtonVariant.PRIMARY;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const defaultStyles =
  "btn py-2 px-5 md:px-4 rounded-lg transition-all duration-500 border capitalize";

const disabledStyles = "opacity-30";


const Button = ({
  variant = DEFAULT_VARIANT,
  children,
  className,
  disabled,
  ...buttonAttrs
}: ButtonProps) => {
  const variantStylesMap = {
    [ButtonVariant.PRIMARY]:
      `bg-main-600 text-white border-main-600 ${!disabled && "hover:bg-white hover:text-main-600"}`,
    [ButtonVariant.PRIMARY_OUTLINE]:
      `border-main-600 bg-white text-main-600 hover:bg-main-200`,
    [ButtonVariant.PRIMARY_INVERSE]:
      `border-main-200 bg-main-200 text-main-600 ${!disabled && "hover:bg-main-600 hover:text-white"}`,
  };
  const btnClasses = `${defaultStyles} ${variantStylesMap[variant]} ${
    disabled ? disabledStyles : ""
  } ${className || ""}`.trim();

  return (
    <button className={btnClasses} disabled={disabled} {...buttonAttrs}>
      {children}
    </button>
  );
};

export default Button;
