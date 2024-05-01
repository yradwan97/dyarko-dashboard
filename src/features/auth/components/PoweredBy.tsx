import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "components/shared/UI";
import { t } from "i18next";

const PoweredBy = (
  {
    img
  }: {
    img: string
  }
) => {
  return (
    <section className="hidden flex-1 bg-gradient-to-b from-main-100 lg:block">
      <div className="container flex h-full flex-col items-center justify-center gap-y-20 px-14 py-10 lg:flex">
        <img src={img} alt="login-pic" />
        <div>
          <Typography variant="body-sm-medium" as="p" className="mb-6">
            {t("general.powered-by")}
          </Typography>
          <Typography variant="body-xs" as="p" className="text-gray-500">
            {t("general.you-agree")}{" "}
            <Link to="/" className="font-medium text-main-600">
              {t("general.terms-and-conditions")}
            </Link>{" "}
            {t("general.terms-and-conditions-message")}
          </Typography>
        </div>
      </div>
    </section>
  );
};

PoweredBy.propTypes = {
  img: PropTypes.string.isRequired,
};

export default PoweredBy;
