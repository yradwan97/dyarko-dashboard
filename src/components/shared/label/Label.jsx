import React from "react";
// import PropTypes from "prop-types";
import { Typography } from "components/shared/UI";

const Label = (props) => {
  const { children, htmlFor, className } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`select-none block mb-2 ${className || ""}`}
    >
      <Typography variant="body-sm-medium" as="span">
        {children}
      </Typography>
    </label>
  );
};

// Label.propTypes = {
//   htmlFor: PropTypes.string.isRequired,
// };

export default Label;
