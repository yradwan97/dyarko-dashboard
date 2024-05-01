import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "components/shared/UI";

const PoweredBy = (props) => {
  return (
    <section className="hidden flex-1 bg-gradient-to-b from-main-100 lg:block">
      <div className="container flex h-full flex-col items-center justify-center gap-y-20 px-14 py-10 lg:flex">
        <img src={props.img} alt="login-pic" />
        <div>
          <Typography variant="body-sm-medium" as="p" className="mb-6">
            Powered by
          </Typography>
          <Typography variant="body-xs" as="p" className="text-gray-500">
            You agree to Estatery's{" "}
            <Link to="/" className="font-medium text-main-600">
              Terms of Use & Privacy Policy.
            </Link>{" "}
            You don't need to consent as a condition of renting any property, or
            buying any other goods or services. Message/data rates may apply.
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
