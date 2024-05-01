import { Typography } from "components/shared/UI";
import messageImg from "assets/images/signup-art.jpg";
import { t } from "i18next";

const EmptyInvoicePropertiesSection = () => {
  return (
    <div className="container flex h-full flex-col items-center justify-center gap-y-5 px-14 py-10 lg:flex">
      <img src={messageImg} className="w-5/6 md:w-1/2" alt="login-pic" />
      <Typography
        className="mb-6 md:w-1/2 text-center"
        variant="body-xl"
        as="h4"
      >
        {t("pages.invoices.no-invoices")}
      </Typography>
    </div>
  );
};

export default EmptyInvoicePropertiesSection;
