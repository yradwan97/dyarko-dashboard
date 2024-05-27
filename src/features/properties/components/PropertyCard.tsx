import React, { ReactNode } from "react";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getLastLocation,
  getPropertyPeriod,
  getPropertyPrice,
  Price,
  PropertyImage,
} from "features/properties";
import clsx from "classnames";
import { Optional } from "types";
import { Property } from "features/properties/types";
import { ROUTES } from "configs/routes";
import { t } from "i18next";

interface PropertyCardProps {
  property: Optional<Property>;
  className?: string;
  children?: ReactNode;
}

const PropertyCard = ({ property, className, children }: any) => {
  const lastLocation = getLastLocation(property?.locations);
  return (
    <div className={clsx("flex-1", className)}>
      <div className="relative">
      <Link to={`${ROUTES.PROPERTIES}/${property?._id}`}>
        <PropertyImage
          imageSrc={property?.image}
          propertyTitle={property?.title}
          />
      </Link>
      </div>
      <div
        className={clsx(
          "bg-white",
          "py-8",
          "px-6",
          "border",
          "border-main-100"
        )}
      >
        <div className="flex flex-col space-y-5">
          <div
            className={clsx(
              "flex",
              "justify-between",
              "items-center",
              "gap-3",
              "flex-wrap"
            )}
          >
            <div>
              {getPropertyPrice(property!) !== null && (
                <>
                  {property?.discount > 0 ? (
                    <Price
                      price={getPropertyPrice(property!)!}
                      period={getPropertyPeriod(property!)!}
                      discountPrice={getPropertyPrice(property!, true)!}
                    />
                  ) : (
                    <Price
                      price={getPropertyPrice(property!)!}
                      period={getPropertyPeriod(property!)!}
                      discountPrice={0}
                    />
                  )}
                </>
              )}
            </div>
            <div>{children}</div>
          </div>
          <h4 className="my-3 text-black font-medium capitalize">
            {property?.title}
          </h4>
          <p className="text-gray-500 text-sm font-medium">{lastLocation}</p>
        </div>
        <div className="border-t border-main-100 flex gap-x-4 items-center mt-5 pt-3">
          <div className="flex justify-between items-center gap-x-2">
            <AiOutlineHeart className="text-main-600 text-xl" />
            <p className="text-black text-sm font-medium">
              {property?.saved ?? 0} {t("general.likes")}
            </p>
          </div>
          <div className="flex justify-between items-center gap-x-2">
            <AiOutlineEye className="text-main-600 text-2xl" />
            <p className="text-black text-sm font-medium">
              {property?.views ?? 0} {t("general.views")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
