import UploadFileIcon from "@mui/icons-material/UploadFile";
import { PaymentType, PropertyCategory } from "features/properties/types";
import {
  CheckboxInputGroup,
  CustomRadioGroup,
  FileInputGroup,
  Form,
  InputGroup,
  RadioInputVariant,
} from "components/shared/form";
import React, { useState } from "react";
import {
  BuyingOptionsFormData,
  BuyingOptionsFormSchema,
  getPaymentTypes,
} from "features/properties";
import { RadioGroupItem } from "components/shared/form/CustomRadioGroup";

export interface BuyingOptionsFormProps {
  propertyCategory: PropertyCategory;
  formSchema: BuyingOptionsFormSchema;
  formValues: BuyingOptionsFormData;
}

const allPaymentTypes: RadioGroupItem<PaymentType>[] = getPaymentTypes([
  PaymentType.RENT,
  PaymentType.CASH,
  PaymentType.SHARE,
  PaymentType.REPLACEMENT,
  PaymentType.INSTALLMENT,
]);

const paymentTypesMap: Record<PropertyCategory, RadioGroupItem<PaymentType>[]> =
{
  [PropertyCategory.HOUSE]: allPaymentTypes,
  [PropertyCategory.CARAVAN]: getPaymentTypes([
    PaymentType.RENT,
    PaymentType.CASH,
    PaymentType.INSTALLMENT,
    PaymentType.REPLACEMENT,
  ]),
  // [PropertyCategory.CARAVAN]: getPaymentTypes([
  //   PaymentType.RENT,
  //   PaymentType.CASH,
  //   PaymentType.INSTALLMENT,
  //   PaymentType.REPLACEMENT,
  // ]),
  [PropertyCategory.CHALET]: allPaymentTypes,
  [PropertyCategory.SINGLE_TENT]: allPaymentTypes,
  [PropertyCategory.TENT_GROUP]: getPaymentTypes([
    PaymentType.RENT,
    PaymentType.CASH,
    PaymentType.INSTALLMENT,
    PaymentType.REPLACEMENT,
  ]),
  [PropertyCategory.FARM]: getPaymentTypes([
    PaymentType.RENT,
    PaymentType.CASH,
    PaymentType.INSTALLMENT,
    PaymentType.REPLACEMENT,
  ]),
  [PropertyCategory.LAND]: getPaymentTypes([
    PaymentType.RENT,
    PaymentType.CASH,
    PaymentType.INSTALLMENT,
    PaymentType.REPLACEMENT,
  ]),
};

const hasRenterValues = [
  {
    value: String(true),
    label: "Yes",
  },
  {
    value: String(false),
    label: "No",
  },
];

export const DEFAULT_PAYMENT_TYPE = PaymentType.RENT;
export const DEFAULT_HAS_RENTER_VALUE = String(false);

const BuyingOptionsForm = ({
  propertyCategory,
  formSchema,
  formValues,
}: BuyingOptionsFormProps) => {
  const [paymentType, setPaymentType] =
    useState<PaymentType>(DEFAULT_PAYMENT_TYPE);
  const [hasRenter, setHasRenter] = useState<string>(DEFAULT_HAS_RENTER_VALUE);

  const rentTypeConfigs = [
    {
      label: "Daily",
      inputSchema: formSchema.isDaily,
    },
    {
      label: "Weekly",
      inputSchema: formSchema.isWeekly,
    },
    {
      label: "Monthly",
      inputSchema: formSchema.isMonthly,
    },
  ];

  return (
    <Form>
      <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
        <CustomRadioGroup
          value={paymentType}
          setValue={setPaymentType}
          radioGroupItems={paymentTypesMap[propertyCategory] || allPaymentTypes}
          hasIndicator={true}
          label="Payment Type"
          variant={RadioInputVariant.MAIN}
          inputSchema={formSchema.paymentType}
        />
        <CustomRadioGroup
          value={hasRenter}
          setValue={setHasRenter}
          radioGroupItems={hasRenterValues}
          hasIndicator={true}
          label="Does this property already has a tenant?*"
          inputSchema={formSchema.hasRenter}
        />
        <CheckboxInputGroup
          label="Please select the rent type*"
          inputsConfigs={rentTypeConfigs}
        />
        <InputGroup
          label="Insurance"
          placeholder="e.g. 2000"
          inputSchema={formSchema.insurance}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {formValues.isDaily ? (
            <InputGroup
              label="Daily Rent*"
              inputSchema={formSchema.dailyRent}
              placeholder="e.g. 2000"
            />
          ) : null}
          {formValues.isWeekly ? (
            <InputGroup
              label="Weekly Rent*"
              placeholder="e.g. 2000"
              inputSchema={formSchema.weeklyRent}
            />
          ) : null}

          {formValues.isMonthly ? (
            <InputGroup
              label="Monthly Rent*"
              placeholder="e.g. 2000"
              inputSchema={formSchema.monthlyRent}
            />
          ) : null}
        </div>
        {formValues.hasRenter === "true" ? (
          <>
            <InputGroup
              label="Dyarko Tenant ID*"
              placeholder="e.g. AB1234"
              inputSchema={formSchema.renterId}
            />
            <InputGroup
              label="Rental Period"
              placeholder="e.g. 8 months"
              inputSchema={formSchema.rentalPeriod}
            />
            <FileInputGroup
              inputSchema={formSchema.rentContract}
              label="Please upload rent contract"
              accept="application/pdf"
              uploadBody={{
                text: "upload",
                icon: <UploadFileIcon />,
              }}
            />
          </>
        ) : null}
      </div>
    </Form>
  );
};

export default BuyingOptionsForm;
