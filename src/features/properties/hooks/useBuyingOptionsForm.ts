import { FormInputSchema } from "types";
import { PaymentType } from "features/properties/types";
import {
  DEFAULT_HAS_RENTER_VALUE,
  DEFAULT_PAYMENT_TYPE,
} from "features/properties/components/BuyingOptionsForm";
import { useForm } from "react-hook-form";

export interface BuyingOptionsFormSchema {
  insurance: FormInputSchema<"insurance">;
  paymentType: FormInputSchema<"paymentType">;
  hasRenter: FormInputSchema<"hasRenter">;
  isWeekly: FormInputSchema<"isWeekly">;
  isDaily: FormInputSchema<"isDaily">;
  isMonthly: FormInputSchema<"isMonthly">;
  dailyRent: FormInputSchema<"dailyRent">;
  weeklyRent: FormInputSchema<"weeklyRent">;
  monthlyRent: FormInputSchema<"monthlyRent">;
  rentalPeriod: FormInputSchema<"rentalPeriod">;
  renterId: FormInputSchema<"renterId">;
  rentContract: FormInputSchema<"rentContract">;
}

export interface BuyingOptionsFormData {
  paymentType: PaymentType;
  hasRenter: string;
  isMonthly: boolean;
  isWeekly: boolean;
  isDaily: boolean;
  insurance: number;
  dailyRent?: number;
  weeklyRent?: number;
  monthlyRent?: number;
  renterId?: string;
  rentalPeriod?: string;
  rentContract?: File;
}

const DEFAULT_FORM_VALUES = {
  paymentType: DEFAULT_PAYMENT_TYPE,
  hasRenter: DEFAULT_HAS_RENTER_VALUE,
};

export const useBuyingOptionsForm = () => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    watch,
  } = useForm<BuyingOptionsFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const formSchema: BuyingOptionsFormSchema = {
    insurance: {
      id: "insurance",
      register: register("insurance", {
        required: "This field is Required",
        pattern: {
          value: /[0-9]+/,
          message: "Enter a valid number",
        },
      }),
      error: errors.insurance,
    },
    paymentType: {
      id: "paymentType",
      register: register("paymentType", {
        required: "Payment Option is required",
      }),
      error: errors.paymentType,
    },
    isDaily: {
      id: "isDaily",
      register: register("isDaily"),
      error: errors.isDaily,
    },
    dailyRent: {
      id: "dailyRent",
      register: register("dailyRent", {
        pattern: {
          value: /[0-9]+/,
          message: "Enter a valid number",
        },
        validate: (value, formValues) => {
          if (!formValues.isDaily || !!formValues.dailyRent) return true;
          return "Daily Rent is required";
        },
      }),
      error: errors.dailyRent,
    },
    isWeekly: {
      id: "isWeekly",
      register: register("isWeekly"),
      error: errors.isWeekly,
    },
    weeklyRent: {
      id: "weeklyRent",
      register: register("weeklyRent", {
        pattern: {
          value: /[0-9]+/,
          message: "Enter a valid number",
        },
        validate: (value, formValues) => {
          if (!formValues.isWeekly || !!formValues.weeklyRent) return true;
          return "Weekly Rent is required";
        },
      }),
      error: errors.weeklyRent,
    },
    isMonthly: {
      id: "isMonthly",
      register: register("isMonthly"),
      error: errors.isMonthly,
    },
    monthlyRent: {
      id: "monthlyRent",
      register: register("monthlyRent", {
        pattern: {
          value: /[0-9]+/,
          message: "Enter a valid number",
        },
        validate: (value, formValues) => {
          if (!formValues.isMonthly || !!formValues.monthlyRent) return true;
          return "Monthly Rent is required";
        },
      }),
      error: errors.monthlyRent,
    },
    hasRenter: {
      id: "hasRenter",
      register: register("hasRenter", {
        required: "Please provide if you have a renter or not",
      }),
      error: errors.hasRenter,
    },
    rentalPeriod: {
      id: "rentalPeriod",
      register: register("rentalPeriod"),
      error: errors.rentalPeriod,
    },
    renterId: {
      id: "renterId",
      register: register("renterId", {
        validate: (value, formValues) => {
          if (formValues.hasRenter !== "true" || !!formValues.renterId)
            return true;
          return "Rental ID is required";
        },
      }),
      error: errors.renterId,
    },
    rentContract: {
      id: "rentContract",
      register: register("rentContract", {
        validate: (value, formValues) => {
          if (formValues.hasRenter !== "true" || !!formValues.rentContract)
            return true;
          return "Rent contract is required";
        },
      }),
      error: errors.rentContract,
    },
  };

  return {
    formSchema,
    errors,
    trigger,
    getValues,
    watch,
  };
};
