import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Listbox, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

const OldButton = (props) => {
  const { variant, className, disabled, ...otherAttrs } = props;
  const style =
    "btn px-2 py-2 md:px-4 tracking-tight rounded-lg transition-all duration-500 border";
  let variantClasses;

  if (props.variant === "primary")
    variantClasses = `${style} bg-main-600 text-white border-main-600 hover:border-main-200 hover:bg-main-500`;
  if (props.variant === "primary-outline")
    variantClasses = `${style} border-0 bg-main-100 text-main-600 hover:bg-main-200`;

  const btnClasses = `text-base btn no-underline ${variantClasses || ""} ${
    disabled ? "opacity-30" : ""
  } ${props.className || ""}`.trim();

  // to set a tag
  if (props.to)
    return (
      <Link
        onClick={props.onClick}
        to={props.to}
        className={btnClasses}
        disabled={disabled}
        {...otherAttrs}
      >
        {props.children}
      </Link>
    );

  // to set input tag
  if (props.variant === "input")
    return (
      <input
        className={`${style} ${className} !py-3 border-gray-200 focus:border-main-yellow-600 outline-0 focus:outline-0 font-medium text-sm text-black`}
        disabled={disabled}
        {...otherAttrs}
      />
    );

  // to set select tag
  // it needs 4 props varient & values & selected & setSelected & className
  if (props.variant === "select") {
    return (
      <Listbox value={props.selected} onChange={props.setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`relative ${style} ${className} !py-3 border-gray-200 text-left focus:border-main-yellow-600 outline-0 focus:outline-0 font-medium text-sm text-black`}
          >
            <span className="block">{props.selected.name}</span>
            <BiChevronDown
              className="text-xl text-gray-400 pointer-events-none absolute top-1/2 -translate-y-1/2 right-1"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`${props.optionStyle} absolute z-10 mt-1 max-h-[225px] w-[157px] right-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {props.values.map((value, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-3 px-6 capitalize ${
                      active ? "bg-main-100 text-main-600" : "text-gray-600"
                    }`
                  }
                  value={value}
                >
                  {props.selected && (
                    <>
                      <span className={`block truncate text-sm font-medium`}>
                        {value.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  }
  // to set button tag
  return (
    <button
      type={props.type || "button"}
      className={btnClasses}
      onClick={props.onClick}
      value={props.value}
      disabled={disabled}
      {...otherAttrs}
    >
      {props.children}
    </button>
  );
};
Button.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default Button;
