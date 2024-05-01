import { FormInputSchema } from "types";
import { useForm } from "react-hook-form";

export interface PropertyDetailsFormSchema {
  propertyType: FormInputSchema<"propertyType">;
  propertyClass: FormInputSchema<"propertyClass">;
  autoNumber: FormInputSchema<"autoNumber">;
  propertyContract: FormInputSchema<"propertyContract">;
  city: FormInputSchema<"city">;
  region: FormInputSchema<"region">;
}

export interface PropertyDetailsFormData {
  propertyType: string;
  propertyClass: string;
  autoNumber: string;
  propertyContract: File;
  city: string;
  region: string;
}

export const usePropertyDetailsForm = () => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm<PropertyDetailsFormData>({
    mode: "onTouched",
  });

  const formSchema: PropertyDetailsFormSchema = {
    propertyType: {
      id: "propertyType",
      register: register("propertyType", {
        required: "property type is required",
      }),
      error: errors.propertyType,
    },
    propertyClass: {
      id: "propertyClass",
      register: register("propertyClass", {
        required: "property class is required",
      }),
      error: errors.propertyClass,
    },
    autoNumber: {
      id: "autoNumber",
      register: register("autoNumber", {
        required: "Auto number is required",
      }),
      error: errors.autoNumber,
    },
    propertyContract: {
      id: "propertyContract",
      register: register("propertyContract", {
        required: "Property contract is required",
      }),
      error: errors.propertyContract,
    },
    city: {
      id: "city",
      register: register("city", {
        required: "City is required",
      }),
      error: errors.city,
    },
    region: {
      id: "region",
      register: register("region", {
        required: "Region is required",
      }),
      error: errors.region,
    },
  };

  return {
    formSchema,
    errors,
    trigger,
    getValues,
    watch,
    setValue,
  };
};
