import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentStep,
  selectIsPropertyTypeSet,
} from "store/addPropertySlice";
import BuyingOptionsForm from "components/views/addProperty/BuyingOptionsForm";
import PropertyFeaturesForm from "components/views/addProperty/PropertyFeaturesForm";
import PropertyDetailsForm from "components/views/addProperty/PropertyDetailsForm";
import PropertyTypeForm from "components/views/addProperty/PropertyTypeForm";

const AddPropertyForms = (props) => {
  const currentStep = useSelector(selectCurrentStep);
  const isPropertyTypeSet = useSelector(selectIsPropertyTypeSet);
  const getPanel = {
    1: <BuyingOptionsForm handler={props.handler} />,
    2: <PropertyDetailsForm handler={props.handler} />,
    3: <PropertyFeaturesForm handler={props.handler} />,
  };
  return (
    <div className="border border-gray-200 p-6 rounded-lg mt-12">
      {isPropertyTypeSet ? getPanel[currentStep] : <PropertyTypeForm />}
    </div>
  );
};

export default AddPropertyForms;
