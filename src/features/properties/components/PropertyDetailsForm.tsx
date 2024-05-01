import {
  PropertyCategory,
  PropertyClass,
  PropertyType,
} from "features/properties/types";
import {
  FileInputGroup,
  Form,
  InputGroup,
  SelectOption,
} from "components/shared/form";
import React, { useState } from "react";
import { Typography } from "components/shared/UI";
import {
  PropertyDetailsFormData,
  PropertyDetailsFormSchema,
} from "features/properties";
import SelectGroup from "components/shared/form/SelectGroup";
import { Optional } from "types";
import { UploadFileOutlined } from "@mui/icons-material";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";

export interface PropertyDetailsFormProps {
  propertyCategory: PropertyCategory;
  formSchema: PropertyDetailsFormSchema;
  formValues: PropertyDetailsFormData;
  setFormValue: UseFormSetValue<PropertyDetailsFormData>;
  triggerForm: UseFormTrigger<PropertyDetailsFormData>;
}

interface PropertyTypeOptionsConfig {
  options: SelectOption<PropertyType>[];
  default?: SelectOption<PropertyType>;
}

const propertyTypesOptionMap: Record<
  PropertyCategory,
  Optional<PropertyTypeOptionsConfig>
> = {
  [PropertyCategory.HOUSE]: {
    options: [
      {
        label: "Apartment",
        value: PropertyType.APARTMENT,
      },

      {
        label: "House",
        value: PropertyType.HOUSE,
      },
      {
        label: "Duplex",
        value: PropertyType.DUPLEX,
      },
      {
        label: "Pent House",
        value: PropertyType.PENTHOUSE,
      },
      {
        label: "Floor",
        value: PropertyType.FLOOR,
      },
      {
        label: "Studio",
        value: PropertyType.STUDIO,
      },
      {
        label: "Palace",
        value: PropertyType.PALACE,
      },
      {
        label: "Town House",
        value: PropertyType.TOWN_HOUSE,
      },
      {
        label: "Stand Alone",
        value: PropertyType.STAND_ALONE,
      },
      {
        label: "Twin House",
        value: PropertyType.TWIN_HOUSE,
      },
      {
        label: "Villa",
        value: PropertyType.VILLA,
      },
      {
        label: "Under Construction",
        value: PropertyType.UNDER_CONSTRUCTION,
      },
    ],
  },
  [PropertyCategory.CHALET]: {
    options: [
      {
        label: "Apartment",
        value: PropertyType.APARTMENT,
      },
      {
        label: "Duplex",
        value: PropertyType.DUPLEX,
      },
      {
        label: "Pent House",
        value: PropertyType.PENTHOUSE,
      },
      {
        label: "Floor",
        value: PropertyType.FLOOR,
      },
      {
        label: "Studio",
        value: PropertyType.STUDIO,
      },
      {
        label: "Palace",
        value: PropertyType.PALACE,
      },
      {
        label: "Town House",
        value: PropertyType.TOWN_HOUSE,
      },
      {
        label: "Stand Alone",
        value: PropertyType.STAND_ALONE,
      },
      {
        label: "Twin House",
        value: PropertyType.TWIN_HOUSE,
      },
      {
        label: "Villa",
        value: PropertyType.VILLA,
      },
      {
        label: "Under Construction",
        value: PropertyType.UNDER_CONSTRUCTION,
      },
      {
        label: "Ground Chalet",
        value: PropertyType.GROUND_CHALET,
      },
      {
        label: "Upper Chalet",
        value: PropertyType.UPPER_CHALET,
      },
    ],
  },
  [PropertyCategory.CARAVAN]: {
    options: [
      {
        label: "Fixed Caravan",
        value: PropertyType.FIXED_CARAVAN,
      },
      {
        label: "Movable Caravan",
        value: PropertyType.MOVABLE_CARAVAN,
      },
    ],
  },
  [PropertyCategory.LAND]: undefined,
  [PropertyCategory.FARM]: undefined,
  [PropertyCategory.SINGLE_TENT]: undefined,
  [PropertyCategory.TENT_GROUP]: undefined,
};

const propertyClassOptions: SelectOption<PropertyClass>[] = [
  {
    label: "None",
    value: PropertyClass.NONE,
  },
  {
    label: "Lux",
    value: PropertyClass.LUX,
  },
  {
    label: "Medium",
    value: PropertyClass.MEDIUM,
  },
  {
    label: "Super Lux",
    value: PropertyClass.SUPER_LUX,
  },
  {
    label: "Ultra Lux",
    value: PropertyClass.ULTRA_SUPER_LUX,
  },
];

const cityOptions: SelectOption<string>[] = [
  {
    label: "City 1",
    value: "City 1",
  },
  {
    label: "City 2",
    value: "City 2",
  },
  {
    label: "City 3",
    value: "City 3",
  },
];

const regionOptions: SelectOption<string>[] = [
  {
    label: "Region 1",
    value: "Region 1",
  },
  {
    label: "Region 2",
    value: "Region 2",
  },
  {
    label: "Region 3",
    value: "Region 3",
  },
];

const PropertyDetailsForm = ({
  propertyCategory,
  formSchema,
  setFormValue,
}: PropertyDetailsFormProps) => {
  const propertyTypeOptionsConfig = propertyTypesOptionMap[propertyCategory];
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    Optional<SelectOption<PropertyType>>
  >(propertyTypeOptionsConfig?.default);
  const [selectedPropertyClass, setSelectedPropertyClass] =
    useState<Optional<SelectOption<PropertyClass>>>();
  const [selectedCity, setSelectedCity] =
    useState<Optional<SelectOption<string>>>();
  const [selectedRegion, setSelectedRegion] =
    useState<Optional<SelectOption<string>>>();

  return (
    <Form>
      <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
        <Typography as="h3" variant="h4" className="mb-10">
          Property Details
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
          {propertyTypeOptionsConfig ? (
            <SelectGroup
              inputSchema={formSchema.propertyType}
              label="Property Type*"
              selectedOption={selectedPropertyType}
              options={propertyTypeOptionsConfig?.options}
              placeholder="Select property type"
              setSelectedOption={setSelectedPropertyType}
              setFormValue={setFormValue}
            />
          ) : null}
          <SelectGroup
            inputSchema={formSchema.propertyClass}
            label="Property Class*"
            selectedOption={selectedPropertyClass}
            options={propertyClassOptions}
            setSelectedOption={setSelectedPropertyClass}
            placeholder="Select property class"
            setFormValue={setFormValue}
          />
        </div>
        <InputGroup
          inputSchema={formSchema.autoNumber}
          label="Auto Number*"
          placeholder="e.g. 6234765"
        />
        <FileInputGroup
          inputSchema={formSchema.propertyContract}
          uploadBody={{
            text: "Upload rent contract",
            icon: <UploadFileOutlined fontSize="large" />,
          }}
          label="Please upload the property contract*"
          accept="application/pdf"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
          <SelectGroup
            inputSchema={formSchema.city}
            label="City*"
            selectedOption={selectedCity}
            options={cityOptions}
            placeholder="Select city"
            setSelectedOption={setSelectedCity}
            setFormValue={setFormValue}
          />
          <SelectGroup
            inputSchema={formSchema.region}
            label="Region*"
            selectedOption={selectedRegion}
            options={regionOptions}
            placeholder="Select region"
            setSelectedOption={setSelectedRegion}
            setFormValue={setFormValue}
          />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27814.423275127174!2d47.94289833034343!3d29.376059535336505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c83ce455983%3A0xc3ebaef5af09b90e!2sKuwait%20City%2C%20Kuwait!5e0!3m2!1sen!2seg!4v1686179691083!5m2!1sen!2seg"
          width="600"
          height="450"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full pt-8"
        ></iframe>
      </div>
    </Form>
  );
};

export default PropertyDetailsForm;
