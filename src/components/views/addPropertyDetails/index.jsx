import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../../shared/label/Label";
import { Button, Typography } from "components/shared/UI";
import UploadFile from "../../shared/uploadFile/UploadFile";
import mapImg from "../../../assets/images/map.png";

const values = [
  { name: "Houses" },
  { name: "Apartment" },
  { name: "Land" },
  { name: "Villa" },
];
const regions = [
  { name: "Cairo" },
  { name: "Alex" },
  { name: "Aswan" },
  { name: "Matroh" },
];

function AddPropertDetails() {
  const [selected, setSelected] = useState(values[0]);
  const [selectRegion, setSelectedRegion] = useState(regions[0]);
  const navigate = useNavigate();

  return (
    <>
      <div className="border border-gray-200 p-6 rounded-lg mt-12">
        <Typography variant="body-md-bold" as="h5" className="text-black mb-4">
          Property Details
        </Typography>
        <div className="flex items-center gap-x-4">
          <div className="max-w-[50%] grow">
            <Label htmlFor="type">Property Type</Label>
            <Button
              variant="select"
              id="type"
              className="w-full"
              values={values}
              selected={selected}
              setSelected={setSelected}
              placeholder="Select type"
            />
          </div>
          <div className="max-w-[50%] grow">
            <Label htmlFor="code">Property code</Label>
            <Button
              variant="input"
              id="code"
              className="w-full"
              placeholder="e.g. 965263"
            />
          </div>
        </div>
        <UploadFile />
        <div className="flex items-center gap-x-4 mt-6">
          <div className="max-w-[50%] grow">
            <Label htmlFor="city">City*</Label>
            <Button
              variant="input"
              id="city"
              className="w-full"
              placeholder="City name"
            />
          </div>
          <div className="max-w-[50%] grow">
            <Label htmlFor="region">Region*</Label>
            <Button
              variant="select"
              id="region"
              className="w-full"
              values={regions}
              selected={selectRegion}
              setSelected={setSelectedRegion}
              placeholder="Select Region"
            />
          </div>
        </div>
        <Link
          to="/"
          className="underline decoration-solid text-main-600 block mt-6"
        >
          <Typography variant="body-md-font" as="span">
            Mark on the map
          </Typography>
        </Link>
        <div className="mt-4">
          <img className="w-full" src={mapImg} alt="map" />
        </div>
      </div>
      <div className="mt-8 flex justify-end items-center gap-x-2">
        <Button
          variant="primary-outline"
          className="!px-12 !py-3"
          onClick={() => navigate(-1)}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          to="/add-property/property-feature"
          className="!px-12 !py-3"
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default AddPropertDetails;
