import React from "react";
import Button from "components/shared/UI/buttons/Button";
import { Typography } from "components/shared/UI";
import Package from "../components/Package";

function CheckRemaining() {
  return (
    <div className="grid grid-cols-3 gap-3 h-full">
      <div className="col-span-2 bg-white h-full py-8 px-6 rounded-lg flex flex-col">
        <div className="space-y-8 grow">
          <Typography variant="h4" as="h4" className="text-black mb-8">
            Your remaining{" "}
          </Typography>
          <Typography variant="bod-md-medium" as="p" className="text-gray-700">
            Checklist item title
          </Typography>
          <Typography variant="bod-md-medium" as="p" className="text-gray-700">
            Checklist item title
          </Typography>
          <Typography variant="bod-md-medium" as="p" className="text-gray-700">
            Checklist item title
          </Typography>
          <Typography variant="bod-md-medium" as="p" className="text-gray-700">
            Checklist item title
          </Typography>
          <Typography variant="bod-md-medium" as="p" className="text-gray-700">
            Checklist item title
          </Typography>
        </div>
        <Button variant="primary" className="md:w-4/12">
          renew
        </Button>
      </div>
      <div className="col-span-1 bg-white py-8 px-6 rounded-lg">
        <Package packageType="golden" />
      </div>
    </div>
  );
}

export default CheckRemaining;
