import React, { useEffect, useState } from "react";
import { Modal, Typography } from "components/shared/UI";
import { useForm } from "react-hook-form";
import { setEditProperty, toggleActiveEditPropertyModal } from "features/properties/slices/createPropertyModalSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  Button,
  Flex,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { t } from "i18next";
import BuyingOptions from "../create/BuyingOptions";
import PropertyDetails from "../create/PropertyDetails";
import PropertyFeatures from "../create/PropertyFeatures";

const steps = [
  { title: "buying-options" },
  { title: "property-details" },
  { title: "property-features" },
];

const EditPropertyModal = () => {
  const { isEditActive, editProperty: property } = useAppSelector(
    (state) => state.createPropertyModal
  );
  const dispatch = useAppDispatch();
  const toast = useToast({ position: "top", duration: 2000 });
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    getValues,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm({defaultValues: property!});
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  console.log(property)
  const watchedFields = watch();
  useEffect(() => {
    if (property !== null) {
        setValue("payment_type", property?.payment_type!)
        setValue("category", property?.category!)
    }
  }, [property]);
  const isFormDirty = () => {
    if (property!) {
      for (const key in watchedFields) {
        // @ts-ignore
        if (watchedFields[key] !== property[key]) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Modal
      isOpen={isEditActive}
      onClose={() => {
        reset();
        setActiveStep(0);
        dispatch(setEditProperty(null))
        dispatch(toggleActiveEditPropertyModal());
      }}
    >
      {property !== null ? <div className="p-10">
        <div className="flex flex-col space-y-5">
          <Typography variant="h3" as="h2" className="text-center capitalize">
            {t("pages.properties.edit.edit-property")}
          </Typography>
        </div>
        <Stack marginBlock={8}>
          <Stepper size="sm" index={activeStep} gap="0">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
                <Text textTransform="capitalize">
                  {t(`pages.properties.create.steps.${step.title}`)!}
                </Text>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Stack>

        <form
          onSubmit={handleSubmit(async (values) => {
            await console.log(values);
          })}
        >
          {activeStep === 0 && (
            <BuyingOptions
              register={register}
              isEditable={isEditActive}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {activeStep === 1 && (
            <PropertyDetails
              isEditable={isEditActive}
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {activeStep === 2 && (
            <PropertyFeatures
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          <Flex justifyContent="space-between" mt={6}>
            <Button
              type="button"
              textTransform="capitalize"
              isDisabled={activeStep === 0}
              onClick={() => setActiveStep(activeStep - 1)}
            >
              {t("general.previous")}
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button type="submit">{t("general.send")}</Button>
            ) : (
              <Button
                type={"button"}
                textTransform="capitalize"
                isDisabled={activeStep === steps.length}
                onClick={() => {
                  trigger();
                  clearErrors();
                  if (errors && Object.keys(errors)!.length > 0) {
                    toast({
                      description: "please correct the errors",
                      colorScheme: "orange",
                    });
                    return;
                  }
                  setActiveStep(activeStep + 1);
                }}
              >
                {t("general.next")}
              </Button>
            )}
          </Flex>
        </form>
      </div> : null}
    </Modal>
  );
};

export default EditPropertyModal;
