import { forwardRef, TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", ...otherAttrs }: TextAreaProps, ref) => {
    return (
      <textarea
        className={`relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600 ${className}`}
        ref={ref}
        rows={5}
        {...otherAttrs}
      ></textarea>
    );
  }
);

export default TextArea;
