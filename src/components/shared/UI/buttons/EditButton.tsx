import { t } from "i18next";
import { ButtonHTMLAttributes } from "react";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const EditButton = (props: EditButtonProps) => {
  return (
    <button className="capitalize text-error underline font-medium" {...props}>
      {t("general.edit")}
    </button>
  );
};

export default EditButton;
