import React, { useState } from "react";
import { CloseEyeOutline, EyeOutline } from "components/shared/icons";
import { InputField, Label } from "components/shared/form";
import PropTypes from "prop-types";

function PasswordInput(props) {
  const [switchIcon, setSwitchIcon] = useState(false);
  const {
    containerClass,
    id,
    label,
    className,
    type,
    register,
    error,
    ...otherAttrs
  } = props;

  const isError = !!error;
  const inputClasses = `block w-full border border-gray-200 py-3 text-black px-5 focus:border-main-yellow-600 focus-visible:ring-main-yellow-600 rounded-lg outline-none ${
    isError ? "focus-visible:border-error border-error" : ""
  } ${className ?? ""}`;

  const togglePassClickHandler = () =>
    setSwitchIcon((switchIcon) => !switchIcon);

  return (
    <div className={`mb-4 flex flex-col space-y-2 ${containerClass || ""}`}>
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2"
          onClick={togglePassClickHandler}
        >
          {switchIcon ? (
            <CloseEyeOutline className="stroke-gray-400" />
          ) : (
            <EyeOutline className="stroke-gray-400" />
          )}
        </button>
        <InputField
          id={id}
          className={inputClasses}
          type={switchIcon ? "text" : "password"}
          register={register}
          {...otherAttrs}
        />
      </div>
      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default PasswordInput;
