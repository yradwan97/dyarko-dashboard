import React from "react";
import Typography from "components/shared/UI/Typograghy";
import { RadioGroup } from "@headlessui/react";

import {
  CaravanPropertyIcon,
  ChaletPropertyIcon,
  FarmPropertyIcon,
  HousePropertyIcon,
  LandPropertyIcon,
  TentPropertyIcon,
} from "../../shared/icons";
import { useDispatch, useSelector } from "react-redux";
import { addPropertyActions, selectPropertyType } from "store/addPropertySlice";

const PropertyTypeForm = () => {
  const dispatch = useDispatch();
  const propertyType = useSelector(selectPropertyType);

  const propertyTypes = [
    {
      value: "house",
      icon: <HousePropertyIcon />,
    },
    {
      value: "tent",
      icon: <TentPropertyIcon />,
    },
    {
      value: "chalet",
      icon: <ChaletPropertyIcon />,
    },
    {
      value: "caravan",
      icon: <CaravanPropertyIcon />,
    },
    {
      value: "land",
      icon: <LandPropertyIcon />,
    },
    {
      value: "farm",
      icon: <FarmPropertyIcon />,
    },
  ];

  const defaultPropertyTypeClasses =
    "rounded-md border border-gray-200 flex h-32 flex-col justify-center items-center w-full";

  const getPropertyClasses = (checked) =>
    checked
      ? `${defaultPropertyTypeClasses} !border-main-600 bg-main-100`
      : defaultPropertyTypeClasses;

  const setPropertyTypeHandler = () =>
    dispatch(addPropertyActions.setPropertyType(propertyType));
  return (
    <div>
      <Typography variant="body-lg-bold" as="p" className="mb-12">
        Choose the property type
      </Typography>
      <RadioGroup
        value={propertyType}
        onChange={(propertyType) =>
          dispatch(addPropertyActions.setPropertyType(propertyType))
        }
        className="grid grid-cols-4 gap-3"
      >
        {propertyTypes.map((propertyType, index) => (
          <RadioGroup.Option value={propertyType.value} key={index}>
            {({ checked }) => (
              <button className={getPropertyClasses(checked)}>
                {propertyType.icon}
                <RadioGroup.Label as="span" className="capitalize">
                  {propertyType.value}
                </RadioGroup.Label>
              </button>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PropertyTypeForm;
