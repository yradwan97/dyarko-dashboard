import Button, { ButtonVariant } from "components/shared/UI/buttons/Button";
import React from "react";
import clsx from "classnames";
import { t } from "i18next";

export interface CustomStepperControlsProps {
  activeStep: number;
  handleBack: () => void;
  handleSkip: () => void;
  handleNext: () => void;
  stepsLength: number;
  isStepOptional?: boolean;
}

const CustomStepperControls = ({
  activeStep,
  handleBack,
  isStepOptional,
  handleSkip,
  handleNext,
  stepsLength,
}: CustomStepperControlsProps) => {
  const defaultClasses: string = "w-36 py-3";
  return (
    <>
      <Button
        variant={ButtonVariant.PRIMARY_INVERSE}
        disabled={activeStep === 0}
        onClick={handleBack}
        className={defaultClasses}
      >
        {t("general.previous")}
      </Button>
      <div className={clsx("flex", "gap-7")}>
        {isStepOptional && <Button onClick={handleSkip}>{t("general.skip")}</Button>}
        <Button onClick={handleNext} className={defaultClasses}>
          {activeStep === stepsLength - 1 ? t("general.submit") : t("general.next")}
        </Button>
      </div>
    </>
  );
};

export default CustomStepperControls;
