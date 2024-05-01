import React, { useState } from "react";
import Button from "components/shared/UI/buttons/Button";
import Label from "../../shared/label/Label";
import HasRenter from "./HasRenter";
import Methods from "./Methods";
import PaymentOption from "./PaymentOption";

function BuyingOption() {
  const [method, setMethod] = useState("sale");

  return (
    <>
      <div className="border border-gray-200 p-6 rounded-lg mt-12">
        <Methods method={method} setMethod={setMethod} />
        {method === "rent" ? (
          <HasRenter />
        ) : (
          <div className="mt-6">
            <PaymentOption />
            <div className="w-1/2">
              <Label htmlFor="" className="mb-4 block">
                Property Price
              </Label>
              <div className="border border-gray-200 rounded-lg overflow-hidden flex">
                <span className="py-3 px-4 border-r border-gray-200 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="text"
                  id="propertyPrice"
                  className="py-3 px-4 grow outline-0 text-gray-500 text-sm font-medium"
                  placeholder="e.g. 2000"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="primary"
        to="add-property-details"
        className="block w-fit !ml-auto mt-8 !px-12 !py-2"
      >
        Next
      </Button>
    </>
  );
}

export default BuyingOption;
