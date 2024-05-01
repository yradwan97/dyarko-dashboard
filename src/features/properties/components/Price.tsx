import { t } from "i18next";
import React from "react";

interface PriceProps {
  price: number;
  period: string;
  discountPrice: number;
}

const Price = ({ price, period, discountPrice }: PriceProps) => {
  return discountPrice !== 0 ? (
    <div className="flex flex-col items-start">
      <p className="tracking-tightest text-2xl font-bold text-main-600">
        {t("general.dinar")} {discountPrice.toFixed(2)}
      </p>
      <div className="flex items-end">
        <p className="tracking-tightest line-through text-lg font-bold text-main-yellow-600">
          {t("general.dinar")} {price}
        </p>
        <span className="text-gray-400 text-base font-medium">/{t(`general.time-period.${period}`)}</span>
      </div>
    </div>
  ) : (
    <div className="flex items-end">
      <p className="tracking-tightest text-2xl font-bold text-main-yellow-600">
        {t("general.dinar")} {price}
      </p>
      <span className="text-gray-400 text-base font-medium">/{t(`general.time-period.${period}`)}</span>
    </div>
  );
};

export default Price;
