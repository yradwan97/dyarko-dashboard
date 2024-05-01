import { BiPlus } from "react-icons/bi";
import { Button } from "components/shared/UI";
import messageImg from "assets/images/signup-art.jpg";
import { ButtonVariant } from "components/shared/UI/buttons";
import { t } from "i18next";

const EmptyPropertiesSection = () => {
  return (
    <div className="container flex h-full flex-col items-center justify-center gap-y-5 px-14 py-10 lg:flex">
      <img src={messageImg} className="w-5/6 md:w-1/2" alt="login-pic" />
      <h4 className="mb-6 text-base font-bold md:w-1/2 text-center">
        {t("pages.properties.no-properties")}
      </h4>
      <Button
        variant={ButtonVariant.PRIMARY}
        className="flex items-center m-auto gap-x-2"
      >
        <BiPlus className="text-white text-xl stroke-1" />
        <span className="text-sm font-bold">{t("layout.navbar.add-a-property")}</span>
      </Button>
    </div>
  );
};

export default EmptyPropertiesSection;
