import house from "assets/images/property-icons/house.png";
import caravan from "assets/images/property-icons/caravan.png";
import chalet from "assets/images/property-icons/chalet.png";
import farm from "assets/images/property-icons/farm.png";
import land from "assets/images/property-icons/land.png";
import tent from "assets/images/property-icons/tent.png";
import React from "react";
import { Typography } from "components/shared/UI";
import { Nullable } from "types";
import { PropertyCategory } from "features/properties";
import clsx from "classnames";

export interface PropertyTypeItem {
  iconImg: string;
  propertyType: PropertyCategory;
  label: string;
}

const propertyTypesItems: PropertyTypeItem[] = [
  {
    label: "House",
    iconImg: house,
    propertyType: PropertyCategory.HOUSE,
  },
  {
    label: "Caravan",
    iconImg: caravan,
    propertyType: PropertyCategory.CARAVAN,
  },
  {
    label: "Chalet",
    iconImg: chalet,
    propertyType: PropertyCategory.CHALET,
  },
  {
    label: "Farm",
    iconImg: farm,
    propertyType: PropertyCategory.FARM,
  },
  {
    label: "Land",
    iconImg: land,
    propertyType: PropertyCategory.LAND,
  },
  {
    label: "Single Tent",
    iconImg: tent,
    propertyType: PropertyCategory.SINGLE_TENT,
  },
  {
    label: "Tent Group",
    iconImg: tent,
    propertyType: PropertyCategory.TENT_GROUP,
  },
];

export interface ChoosePropertyTypeProps {
  propertyType: Nullable<PropertyCategory>;
  onPropertyChange: (propertyType: PropertyCategory) => void;
}

const ChoosePropertyType = ({
  propertyType,
  onPropertyChange,
}: ChoosePropertyTypeProps) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg">
      <Typography variant="body-lg-bold" as="p" className="text-black mb-6">
        Choose the property type
      </Typography>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {propertyTypesItems.map((propertyTypeItem, index) => (
          <button
            className={clsx(
              "w-[150px]",
              "h-[155px]",
              "border",
              "rounded-lg",
              "flex",
              "flex-col",
              "justify-center",
              "items-center",
              "capitalize",
              "hover:bg-main-100",
              "hover:border-main-300",
              {
                "bg-main-100 border-main-300":
                  propertyType === propertyTypeItem.propertyType,
                "border-gray-200 bg-white":
                  propertyType !== propertyTypeItem.propertyType,
              }
            )}
            key={index}
            onClick={() => onPropertyChange(propertyTypeItem.propertyType)}
          >
            <img
              src={propertyTypeItem.iconImg}
              className="w-[62px] h-[62px]"
              alt="property"
            />
            <Typography
              variant="body-md-medium"
              as="p"
              className="text-gray-900 mt-5"
            >
              {propertyTypeItem.label}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoosePropertyType;
