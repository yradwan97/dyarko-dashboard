import React, { useState } from "react";
import { PropertyCategory } from "features/properties/types";
import { useAppDispatch, useAppSelector } from "hooks";
import { Step, StepperEvent } from "components/shared/UI/customStepper";
import {
  BuyingOptionsForm,
  ChoosePropertyType,
  PropertyDetailsForm,
  PropertyFeaturesForm,
  useBuyingOptionsForm,
  usePropertyDetailsForm,
  usePropertyFeaturesForm,
} from "features/properties";

const DEFAULT_PROPERTY_TYPE = PropertyCategory.HOUSE;

export const usePropertyModal = () => {
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategory>(
    DEFAULT_PROPERTY_TYPE
  );
  const dispatch = useAppDispatch();
  const {
    formSchema: buyingOptionsSchema,
    trigger: triggerBuyingOptionsForm,
    getValues: getBuyingOptionsValues,
    watch: watchBuyingOptionsFields,
  } = useBuyingOptionsForm();
  const {
    formSchema: propertyDetailsSchema,
    trigger: triggerPropertyDetailsForm,
    getValues: getPropertyDetailsValues,
    watch: watchPropertyDetailsFields,
    setValue: setPropertyDetailsValue,
  } = usePropertyDetailsForm();
  const {
    formSchema: propertyFeaturesSchema,
    trigger: triggerPropertyFeaturesForm,
    getValues: getPropertyFeaturesValues,
    watch: watchPropertyFeaturesFields,
    setValue: setPropertyFeaturesValue,
    control: controlPropertyFeature,
  } = usePropertyFeaturesForm();
  // const isAddPropertyModalShown = useAppSelector(selectModalState);
  // const hideModal = () => dispatch(hideAddPropertyModal());

  const stepsIndicesMap: Record<string, () => Promise<boolean>> = {
    "1": triggerBuyingOptionsForm,
    "2": triggerPropertyDetailsForm,
    "3": triggerPropertyFeaturesForm,
  };

  const handleNextStep: StepperEvent = async (activeStep, moveStep) => {
    const validateForm = stepsIndicesMap[String(activeStep)];
    if (!validateForm) return moveStep();
    const isSubmitSuccessfully = await validateForm();
    if (isSubmitSuccessfully) moveStep();
  };

  const steps: Step[] = [
    {
      label: "Choose A Property",
      element: (
        <ChoosePropertyType
          propertyType={propertyCategory}
          onPropertyChange={setPropertyCategory}
        />
      ),
    },
    {
      label: "Buying Options",
      element: (
        <BuyingOptionsForm
          formSchema={buyingOptionsSchema}
          formValues={watchBuyingOptionsFields()}
          propertyCategory={propertyCategory}
        />
      ),
    },
    {
      label: "Property Details",
      element: (
        <PropertyDetailsForm
          formSchema={propertyDetailsSchema}
          formValues={watchPropertyDetailsFields()}
          propertyCategory={propertyCategory}
          setFormValue={setPropertyDetailsValue}
          triggerForm={triggerPropertyDetailsForm}
        />
      ),
    },
    {
      label: "Property Features",
      element: (
        <PropertyFeaturesForm
          formSchema={propertyFeaturesSchema}
          formValues={watchPropertyFeaturesFields()}
          propertyCategory={propertyCategory}
          setFormValue={setPropertyFeaturesValue}
          triggerForm={triggerPropertyFeaturesForm}
        />
      ),
    },
  ];

  return {
    // isAddPropertyModalShown,
    // hideModal,
    steps,
    handleNextStep,
  };
};
