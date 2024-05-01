import { TextArea, TextAreaProps } from "components/shared/form";

export interface TextAreaFieldProps extends TextAreaProps {
  id: string;
  register: any;
}

const TextAreaField = ({
  id,
  className,
  register,
  ...otherAttrs
}: TextAreaFieldProps) => {
  return (
    <TextArea
      id={id}
      className={className}
      {...register}
      {...otherAttrs}
    ></TextArea>
  );
};

export default TextAreaField;
