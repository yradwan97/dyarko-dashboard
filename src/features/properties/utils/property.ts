import { Optional } from "types";
import { PaymentType, Property, PropertyType } from "features/properties";
import { RadioGroupItem } from "components/shared/form";

export const getLastLocation = (locations: Optional<string[]>) => {
  if (locations === undefined) return null;
  const lastLocationIndex = locations.length || 0;
  return locations[lastLocationIndex - 1];
};

export const getPaymentTypes = (
  paymentTypes: PaymentType[]
): RadioGroupItem<PaymentType>[] => {
  const paymentsMap: Record<PaymentType, RadioGroupItem<PaymentType>> = {
    [PaymentType.RENT]: {
      value: PaymentType.RENT,
      label: "rent",
    },
    [PaymentType.CASH]: {
      value: PaymentType.CASH,
      label: "cash",
    },
    [PaymentType.INSTALLMENT]: {
      value: PaymentType.INSTALLMENT,
      label: "installment",
    },
    [PaymentType.SHARE]: {
      value: PaymentType.SHARE,
      label: "share",
    },
    [PaymentType.REPLACEMENT]: {
      value: PaymentType.REPLACEMENT,
      label: "replacement",
    },
  };
  return paymentTypes.map((paymentType) => paymentsMap[paymentType]);
};

export const getCategorySpecificTypes = (category: string) => {
  switch (category) {
    case "house":
      return (
        [
          "stand_alone",
          "duplex",
          "twin_house",
          "town_house",
          "floor",
          "house",
          "palace",
          "under_construction",
          "villa",
          "studio",
          "penthouse",
        ].map((type: string) => {
          return { value: type, name: type.replaceAll("_", " ") };
        }) || []
      );
    case "chalet":
      return ["upper_chalet", "ground_chalet", "villa", "studio"].map(
        (type: string) => {
          return { value: type, name: type.replaceAll("_", " ") };
        }
      );
    case "tent_group":
      return ["tent_group"].map((type: string) => {
        return { value: type, name: type.replaceAll("_", " ") };
      });

    case "tent_single":
      return ["tent_single"].map((type: string) => {
        return { value: type, name: type.replaceAll("_", " ") };
      });
    case "caravan":
      return ["fixed", "movable"].map((type: string) => {
        return { value: type, name: type.replaceAll("_", " ") };
      });

    case "land":
      return ["land"].map((type: string) => {
        return { value: type, name: type.replaceAll("_", " ") };
      });

    case "farm":
      return ["farm"].map((type: string) => {
        return { value: type, name: type.replaceAll("_", " ") };
      });
  }
};

export const getCategorySpecificClasses = (category: string) => {
  switch (category) {
    case "house":
      return ["commercial", "administrative", "residential", "entertainment"];
    case "chalet":
      return ["entertainment"];
    case "tent_group":
      return ["entertainment"];

    case "tent_single":
      return ["entertainment"];
    case "caravan":
      return ["entertainment"];

    case "land":
      return ["commercial", "administrative"];

    case "farm":
      return ["commercial", "administrative"];
  }
};

export const getPropertyPeriod = (property: Property) => {
  return property.payment_type === "rent"
    ? property?.is_daily
      ? "day"
      : property?.is_weekly
      ? "week"
      : property?.is_monthly
      ? "month"
      : ""
    : null;
};

export const getPropertyPrice = (property: Property, getDiscountedPrice: boolean = false) => {
  let fractionAfterDiscount = property?.discount ? (1 - (property.discount)/100) : 1
  let price = property?.payment_type === "rent"
    ? property?.is_daily
      ? property?.daily_price
      : property?.is_weekly
      ? property?.weekly_price
      : property?.monthly_price
    : property?.price ? property?.price : null;
  return (getDiscountedPrice && price) ? price! * fractionAfterDiscount : (!getDiscountedPrice && price) ? price : null
};

export const format = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
