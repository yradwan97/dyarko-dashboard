import { t } from "i18next";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <button
      onClick={handleBackClick}
      className="text-gray-500 text-base font-bold rtl:flex-row-reverse inline-flex items-center gap-x-2 my-6"
    >
      <HiOutlineArrowNarrowLeft />
      <span>{t("general.back")}</span>
    </button>
  );
};

export default BackButton;
