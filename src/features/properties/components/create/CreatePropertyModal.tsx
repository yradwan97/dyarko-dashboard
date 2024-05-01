import { axiosInstance as axios } from "services/axiosInstance";
import { Modal, Typography } from "components/shared/UI";
import { useForm } from "react-hook-form";
import { toggleActiveCreatePropertyModal } from "features/properties/slices/createPropertyModalSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import SelectCategory from "./SelectCategory";
import {
  Button,
  Flex,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import BuyingOptions from "./BuyingOptions";
import PropertyDetails from "./PropertyDetails";
import PropertyFeatures from "./PropertyFeatures";
import { t } from "i18next";
import { Property } from "features/properties/types";
import { Optional } from "types";

const steps = [
  { title: "category" },
  { title: "buying-options" },
  { title: "property-details" },
  { title: "property-features" },
];

const CreatePropertyModal = () => {
  const toast = useToast({ position: "top", status: "error", duration: 2000 });
  const createPropertyModal = useAppSelector(
    (state) => state.createPropertyModal
  );

  const dispatch = useAppDispatch();
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
  } = useForm();

  const createProperty = async (values: any) => {
    const formData = new FormData();
    for (let prop in values) {
      if (values[prop] === "" ||( values[prop]?.length && values[prop].length === 0) ) {
        delete values[prop];
      }
    }
    for (let prop in values) {
      formData.set(prop, values[prop]);
      if (
        prop === "is_daily" ||
        prop === "is_weekly" ||
        prop === "is_monthly"
      ) {
        if (values[prop] === false) {
          formData.delete(prop);
        }
      }
      if (formData.get(prop) === '') {
        formData.delete(prop)
      }
      if (prop === "service" || prop === "amenity") {
        formData.delete(prop);
      }
      if (
        prop === "contract" ||
        prop === "image" ||
        prop === "images" ||
        prop === "interior_design"
      ) {
        formData.delete(prop)
        let files = values[prop];
        if (files.length > 0) {
        if (prop === "images") {
          for (let i = 0; i < files.length; i++) {
            formData.set(`images[${i}]`, files[i]);
          }
        } else {
          formData.set(prop, files[0]);
        }
      }
      }
    }
    let tents = JSON.parse(values["tents_info"])
    formData.delete("tents_info")
    for (let i = 0; i < tents.length; i++) {
      let keys = Object.keys(tents[i])
      let values = Object.values(tents[i])
      for (let j = 0; j < keys.length; j++) {
        formData.set(`tents_info[${i}].${keys[j]}`, `${values[j]}`)
      }
    }
    formData.set("locations[0]", "cairo");
    formData.set("locations[1]", "new gahra");
    formData.set("payment_option", createPropertyModal.paymentOption);
    try {
      let res = await axios.post("https://api.dyarko.com/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast({description: "Property created successfully."})
        dispatch(toggleActiveCreatePropertyModal())
      }
    } catch (e: any) {
      toast({
        description:
          (e?.response?.data.errors[0] && e.response.data.errors[0].msg) ||
          "error",
      });
    }
  };

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  watch([
    "category",
    "payment_type",
    "is_daily",
    "is_weekly",
    "is_monthly",
    "has_renter",
    "is_finished",
  ]);

  return (
    <Modal
      isOpen={createPropertyModal.isActive}
      onClose={() => {
        setActiveStep(0);
        reset();
        dispatch(toggleActiveCreatePropertyModal());
      }}
    >
      <div className="p-10">
        <div className="flex flex-col space-y-5">
          <Typography variant="h3" as="h2" className="text-center capitalize">
            {t("pages.properties.create.add-new")}
          </Typography>
          <Typography
            variant="body-md-medium-tall"
            as="p"
            className="text-center text-gray-400"
          >
            {t("pages.properties.create.add-new-message")}
          </Typography>
        </div>

        {/* custom stepper */}
        <Stack marginBlock={8}>
          <Stepper size="sm" index={activeStep} gap="0">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
                <Text textTransform="capitalize">{t(`pages.properties.create.steps.${step.title}`)!}</Text>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Stack>
        <form
          onSubmit={handleSubmit(async (values) => {
            await createProperty(values);
          })}
        >
          {activeStep === 0 && (
            <SelectCategory
              errors={errors}
              register={register}
              onChange={(category: string) => {
                setValue("category", category);
              }}
              propertyCategory={getValues("category")}
            />
          )}
          {activeStep === 1 && (
            <BuyingOptions
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {activeStep === 2 && (
            <PropertyDetails
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {activeStep === 3 && (
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
                  clearErrors("paymentFrequency");
                  const isDailyChecked = getValues("is_daily");
                  const isWeeklyChecked =
                    getValues("is_weekly") !== undefined
                      ? getValues("is_weekly")
                      : false;
                  const isMonthlyChecked =
                    getValues("is_monthly") !== undefined
                      ? getValues("is_monthly")
                      : false;
                  const isRent = getValues("payment_type") === "rent";

                  if (
                    activeStep === 1 &&
                    isRent &&
                    !isDailyChecked &&
                    !isWeeklyChecked &&
                    !isMonthlyChecked
                  ) {
                    setError("paymentFrequency", {
                      message: "Payment frequency is required",
                    });
                    return;
                  }
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
      </div>
    </Modal>
  );
};

export default CreatePropertyModal;
