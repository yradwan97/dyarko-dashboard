import React from 'react'
import PropTypes from "prop-types";
import { t } from 'i18next';

function Badge(props) {
  return (
    <>
      {
        props.badge === 'active' ?
          <div className={` rounded-full py-2 px-4 text-center bg-main-100`}>
            <span className="text-success text-sm font-bold uppercase">{t("property.active")}</span>
          </div>

          :
          <div className={`rounded-md py-1 px-4 text-center bg-main-100 border border-main-600`}>
            <span className="text-main-600 text-sm font-bold capitalize">{t("property.promote")}</span>
          </div>

      }
    </>
  )
}

Badge.propTypes = {
  badge: PropTypes.string.isRequired,
};

export default Badge