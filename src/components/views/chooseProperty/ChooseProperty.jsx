import React, { useState } from "react";
import house from "../../../assets/images/property-icons/house.png";
import apartment from "../../../assets/images/property-icons/apartment.png";
import caravan from "../../../assets/images/property-icons/caravan.png";
import chalet from "../../../assets/images/property-icons/chalet.png";
import farm from "../../../assets/images/property-icons/farm.png";
import hotel from "../../../assets/images/property-icons/hotel.png";
import land from "../../../assets/images/property-icons/land.png";
import mansion from "../../../assets/images/property-icons/mansion.png";
import room from "../../../assets/images/property-icons/room.png";
import tent from "../../../assets/images/property-icons/tent.png";
import { Typography } from "components/shared/UI";
import Button from "components/shared/UI/buttons/Button";

const icons = [
  {
    id: 1,
    icon: house,
    name: "house",
  },
  {
    id: 2,
    icon: apartment,
    name: "apartment",
  },
  {
    id: 3,
    icon: caravan,
    name: "caravan",
  },
  {
    id: 4,
    icon: chalet,
    name: "chalet",
  },
  {
    id: 5,
    icon: farm,
    name: "farm",
  },
  {
    id: 6,
    icon: hotel,
    name: "hotel",
  },
  {
    id: 7,
    icon: land,
    name: "land",
  },
  {
    id: 8,
    icon: mansion,
    name: "mansion",
  },
  {
    id: 9,
    icon: room,
    name: "room",
  },
  {
    id: 10,
    icon: tent,
    name: "tent",
  },
];

function ChooseProperty() {
  const [type, setType] = useState("");

  return (
    <div className="bg-white py-20">
      <div className="md:w-8/12 mx-auto">
        <Typography
          variant="h3"
          as="h3"
          className="text-black mb-6 text-center"
        >
          Add New Property
        </Typography>
        <div className="border border-gray-200 p-6 rounded-lg">
          <Typography variant="body-lg-bold" as="p" className="text-black mb-6">
            Choose the property type
          </Typography>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {icons.map((icon) => (
              <div
                className={`
                        ${
                          type === icon.name
                            ? "bg-main-100 border-main-300"
                            : "border-gray-200 bg-white"
                        }
                        w-[150px] h-[155px] cursor-pointer border  rounded-lg flex flex-col justify-center items-center capitalize hover:bg-main-100 hover:border-main-300`}
                key={icon.id}
                onClick={() => setType(icon.name)}
              >
                <img
                  src={icon.icon}
                  className="w-[62px] h-[62px]"
                  alt="property"
                />
                <Typography
                  variant="body-md-medium"
                  as="p"
                  className="text-gray-900 mt-5"
                >
                  {icon.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="primary"
          to="/add-property"
          className="block w-fit !ml-auto mt-8 !px-12 !py-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ChooseProperty;
