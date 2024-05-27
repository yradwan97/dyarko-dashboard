import React, { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
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
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import CaravanPickupLocationModal from "./CaravanPickupLocationModal";
import RequestedServicesModal from "./RequestedServicesModal";

interface PropertyCardProps {
  property: Optional<Property>;
  className?: string;
  children?: ReactNode;
}

const InvoicePropertyCard = ({
  property,
  className,
  children,
}: PropertyCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isServicesModalOpen,
    onOpen: onServicesModalOpen,
    onClose: onServicesModalClose,
  } = useDisclosure();
  const lastLocation = getLastLocation(property?.locations);
  const isCaravanMovable =
    property?.category === "caravan" && property?.type === "movable";
  return (
    <div className={clsx("flex-1", className)}>
      <Link to={`${ROUTES.PROPERTIES}/${property?._id}`}>
        <PropertyImage
          isTerminated={property?.is_terminated}
          imageSrc={property?.image}
          propertyTitle={property?.title}
        />
      </Link>
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
            <div className="flex justify-between w-full">
              {property?.payment_type === "rent" &&
                getPropertyPrice(property!) !== null && (
                  <div>
                    <Price
                      price={getPropertyPrice(property!)!}
                      period={getPropertyPeriod(property!)!}
                      discountPrice={0}
                    />
                  </div>
                )}
              {isCaravanMovable && (
                <div className="relative right-0">
                  <IconButton
                    onClick={onOpen}
                    icon={<FaLocationDot />}
                    aria-label="Open Pickup Location"
                  />
                </div>
              )}
            </div>
            <div>{children}</div>
          </div>
          <h4 className="my-3 text-black font-medium capitalize">
            {property?.title}
          </h4>
          <p className="text-gray-500 text-sm font-medium">{lastLocation}</p>
        </div>
        <div className="flex-col border-t border-main-100 flex justify-center items-start mt-5 pt-3">
          <NavLink to={`${ROUTES.PROPERTY_INVOICES}/${property?._id}`}>
            <Button variant={"ghost"} textColor={"main.600"}>{t("pages.invoices.view-all")}</Button>
          </NavLink>
          <a
            href={property?.contract as string}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant={"ghost"} textColor={"main.600"}>
              {t("pages.invoices.view-contract")}
            </Button>
          </a>
          {property!.services!.length > 0 && (
            <a
              onClick={onServicesModalOpen}
              className="hover:cursor-pointer underline text-main-600"
            >
              <Button variant={"ghost"} textColor={"main.600"}>
                {t("pages.invoices.view-services")}
              </Button>
            </a>
          )}
        </div>
      </div>
      <CaravanPickupLocationModal
        isOpen={isOpen}
        onClose={onClose}
        lat={property?.lat!}
        lng={property?.long!}
      />
      <RequestedServicesModal
        isOpen={isServicesModalOpen}
        onClose={onServicesModalClose}
        services={property!.services!}
      />
    </div>
  );
};

export default InvoicePropertyCard;
