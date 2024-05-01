import React from "react";
import Button from "components/shared/UI/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addPropertyActions,
  selectCurrentStep,
  selectIsPropertyTypeSet,
  selectPropertyType,
  selectStepsLength,
} from "store/addPropertySlice";

const AddPropertyControllers = (props) => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const stepsLength = useSelector(selectStepsLength);
  const isPropertyTypeSet = useSelector(selectIsPropertyTypeSet);
  const propertyType = useSelector(selectPropertyType);

  const nextStepHandler = () => dispatch(addPropertyActions.nextStep());
  const prevStepHandler = () => dispatch(addPropertyActions.prevStep());

  const submitHandler = () => {
    props.handler();
    if (currentStep === stepsLength) return console.log("Submit Handler");
    if (!isPropertyTypeSet && propertyType !== null)
      return dispatch(addPropertyActions.setIsPropertyTypeSet(true));
    nextStepHandler();
  };

  return (
    <div className="mt-8 flex justify-end items-center gap-x-2">
      {currentStep !== 1 ? (
        <Button
          variant="primary-outline"
          className="!px-12 !py-3"
          onClick={prevStepHandler}
        >
          Previous
        </Button>
      ) : null}
      <Button
        variant="primary"
        className="!px-12 !py-3"
        disabled={propertyType === null}
        onClick={submitHandler}
      >
        {currentStep === stepsLength ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default AddPropertyControllers;
