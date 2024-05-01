import { FieldValues, useForm, UseFormProps } from "react-hook-form";

export interface UseFormSchemaProps<TFieldValues extends FieldValues>
  extends UseFormProps<TFieldValues> {}

export const useFormSchema = <TFormData extends FieldValues>({
  defaultValues,
}: UseFormSchemaProps<TFormData> = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TFormData>({
    defaultValues,
  });

  return { register, handleSubmit, errors, isSubmitSuccessful };
};
