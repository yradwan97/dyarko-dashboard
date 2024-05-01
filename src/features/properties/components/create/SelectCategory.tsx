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
import { Text } from "@chakra-ui/react";
import { t } from "i18next";

export interface PropertyCategoryItem {
  iconImg: string;
  propertyCategory: PropertyCategory;
  label: string;
}

export const propertyCategorysItems: PropertyCategoryItem[] = [
  {
    label: "House",
    iconImg: house,
    propertyCategory: PropertyCategory.HOUSE,
  },
  {
    label: "Caravan",
    iconImg: caravan,
    propertyCategory: PropertyCategory.CARAVAN, 
  },
  {
    label: "Chalet",
    iconImg: chalet,
    propertyCategory: PropertyCategory.CHALET,
  },
  {
    label: "Farm",
    iconImg: farm,
    propertyCategory: PropertyCategory.FARM,
  },
  {
    label: "Land",
    iconImg: land,
    propertyCategory: PropertyCategory.LAND,
  },
  {
    label: "Single Tent",
    iconImg: tent,
    propertyCategory: PropertyCategory.SINGLE_TENT,
  },
  {
    label: "Tent Group",
    iconImg: tent,
    propertyCategory: PropertyCategory.TENT_GROUP,
  },
];

export interface SelectCategoryProps {
  register: any;
  errors: any,
  propertyCategory: Nullable<PropertyCategory>;
  onChange: (propertyCategory: PropertyCategory) => void;
}

const SelectCategory = ({
  register,
  errors,
  propertyCategory,
  onChange,
}: SelectCategoryProps) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg">
      <Typography variant="body-lg-bold" as="p" className="text-black mb-6">
        {t("pages.properties.create.choose-category")}
      </Typography>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {propertyCategorysItems.map((propertyCategoryItem, index) => (
          <React.Fragment key={index}>
            <input
              type="hidden"
              id={propertyCategoryItem.label}
              {...register("category", {
                required: `${t("pages.properties.create.validation.category")}`
              })}
            />
            <label
              htmlFor={propertyCategoryItem.label}
              className={clsx(
                "cursor-pointer",
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
                    propertyCategory === propertyCategoryItem.propertyCategory,
                  "border-gray-200 bg-white":
                    propertyCategory !== propertyCategoryItem.propertyCategory,
                }
              )}
              onClick={() => onChange(propertyCategoryItem.propertyCategory)}
            >
              <img
                src={propertyCategoryItem.iconImg}
                className="w-[62px] h-[62px]"
                alt="property"
              />
              <Typography
                variant="body-md-medium"
                as="p"
                className="text-gray-900 mt-5"
              >
                {t(`general.${propertyCategoryItem.propertyCategory}`)}
              </Typography>
            </label>
          </React.Fragment>
        ))}
      </div>
      {errors.category && (
        <Text color="red.400" mt={4} fontSize="1rem" textTransform="capitalize">
          {errors.category.message}
        </Text>
      )}
    </div>
  );
};

export default SelectCategory;
