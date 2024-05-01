import { FormInputSchema } from "types";
import { useForm } from "react-hook-form";

export interface ReportsFilterFormSchema {
  title: FormInputSchema<"title">;
  city: FormInputSchema<"city">;
  renterName: FormInputSchema<"renterName">;
  propertyTitle: FormInputSchema<"propertyTitle">;
  propertyCode: FormInputSchema<"propertyCode">;
  dateTo: FormInputSchema<"dateTo">;
  dateFrom: FormInputSchema<"dateFrom">;
  status: FormInputSchema<"status">;
}

export interface ReportsFilterFormData {
  title: string;
  city: string;
  renterName: string;
  propertyTitle: string;
  propertyCode: string;
  dateTo: string;
  dateFrom: string;
  status: string;
}

const DEFAULT_FORM_VALUES = {};

export const useReportsFilterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ReportsFilterFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const formSchema: ReportsFilterFormSchema = {
    title: {
      id: "title",
      register: register("title"),
      error: errors.title,
    },
    city: {
      id: "city",
      register: register("city"),
      error: errors.city,
    },
    renterName: {
      id: "renterName",
      register: register("renterName"),
      error: errors.renterName,
    },
    propertyTitle: {
      id: "propertyTitle",
      register: register("propertyTitle"),
      error: errors.propertyTitle,
    },
    propertyCode: {
      id: "propertyCode",
      register: register("propertyCode"),
      error: errors.propertyCode,
    },
    dateTo: {
      id: "dateTo",
      register: register("dateTo"),
      error: errors.dateTo,
    },
    dateFrom: {
      id: "dateFrom",
      register: register("dateFrom"),
      error: errors.dateFrom,
    },
    status: {
      id: "status",
      register: register("status"),
      error: errors.status,
    },
  };

  return {
    formSchema,
    errors,
    handleSubmit,
  };
};
