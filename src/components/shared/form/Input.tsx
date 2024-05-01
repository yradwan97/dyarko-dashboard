import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "classnames";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const DEFAULT_INPUT_CLASSES = clsx(
  "relative",
  "block",
  "w-full",
  "rounded-lg",
  "border",
  "border-gray-200",
  "py-3",
  "px-5",
  "text-main-secondary",
  "text-black",
  "outline-none",
  "focus:border-main-yellow-600",
  "focus-visible:ring-main-yellow-600"
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...otherProps }: InputProps, ref) => {
    return (
      <input
        className={clsx(DEFAULT_INPUT_CLASSES, className)}
        ref={ref}
        {...otherProps}
      />
    );
  }
);

export default Input;
