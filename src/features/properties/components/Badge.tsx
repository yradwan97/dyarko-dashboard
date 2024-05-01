import React from "react";
import PropTypes from "prop-types";

function Badge(props: any) {
  return (
    <>
      {props.badge === "active" ? (
        <div className={` rounded-full py-2 px-4 text-center bg-main-100`}>
          <span className="text-success text-sm font-bold uppercase">
            Active
          </span>
        </div>
      ) : (
        <div
          className={`rounded-md py-1 px-4 text-center bg-main-100 border border-main-600`}
        >
          <span className="text-main-600 text-sm font-bold capitalize">
            Promote
          </span>
        </div>
      )}
    </>
  );
}

Badge.propTypes = {
  badge: PropTypes.string.isRequired,
};

export default Badge;
