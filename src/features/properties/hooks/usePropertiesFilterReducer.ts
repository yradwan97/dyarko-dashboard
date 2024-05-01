import { useFilterReducer } from "hooks";
import { PaymentType, PropertiesFilter } from "features/properties/types";

export enum PROPERTIES_FILTER {
  PAGE = "page",
  SIZE = "size",
  PAYMENT_TYPE = "payment_type",
}

const defaultPropertiesFilter: PropertiesFilter = {
  page: "1",
  size: "9",
  payment_type: PaymentType.RENT,
};

export const usePropertiesFilterReducer = () => {
  return useFilterReducer<PropertiesFilter, PROPERTIES_FILTER>(
    defaultPropertiesFilter,
    PROPERTIES_FILTER
  );
};
