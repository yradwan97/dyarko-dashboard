import React, { ReactNode } from "react";
import {
  Orientation,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import {
  CustomStepperControls,
  useCustomStepper,
} from "components/shared/UI/customStepper";
import clsx from "classnames";

export interface Step {
  label: string;
  element: JSX.Element;
}

export interface CustomStepperOptions {
  orientation?: Orientation;
  optionalLabel?: ReactNode;
  optionalSteps?: Set<number>;
}

export type StepperEvent = (activeStep: number, moveStep: () => void) => void;

export interface CustomStepperProps {
  steps: Step[];
  onNextStep: StepperEvent;
  options?: CustomStepperOptions;
  successRenderer?: JSX.Element;
}

const CustomStepper = ({
  steps,
  options,
  successRenderer,
  onNextStep,
}: CustomStepperProps) => {
  if (options?.optionalSteps && options?.optionalSteps.size >= steps.length)
    throw RangeError("Optional steps are out of used steps range");
  const {
    activeStep,
    isStepOptional,
    isStepSkipped,
    handleSkip,
    handleNext,
    handleBack,
  } = useCustomStepper(options?.optionalSteps);

  const handleNextStep = () => onNextStep(activeStep, handleNext);

  return (
    <div className={clsx("flex", "flex-col", "space-y-12", "p-4")}>
      <Stepper activeStep={activeStep} orientation={options?.orientation}>
        {steps.map((step, index) => {
          const optionalLabel = isStepOptional(index)
            ? options?.optionalLabel
            : undefined;
          const completed = isStepSkipped(index) ? false : undefined;
          return (
            <Step key={step.label} completed={completed}>
              <StepLabel optional={optionalLabel}>{step.label}</StepLabel>
              {options?.orientation === "vertical" ? (
                <StepContent>{step.element}</StepContent>
              ) : null}
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>{successRenderer}</>
      ) : (
        <div className={clsx("flex", "flex-col", "space-y-10")}>
          {steps[activeStep] ? steps[activeStep].element : null}
          <div className={clsx("w-full", "flex", "justify-end", "gap-x-5")}>
            <CustomStepperControls
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNextStep}
              handleSkip={handleSkip}
              isStepOptional={isStepOptional(activeStep)}
              stepsLength={steps.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomStepper;
