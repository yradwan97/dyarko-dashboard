import { PropertyCategory, PropertyType } from "features/properties/types";
import {
  FileInputGroup,
  Form,
  InputGroup,
  SelectOption,
} from "components/shared/form";
import React, { useState } from "react";
import { Typography } from "components/shared/UI";
import {
  PropertyFeaturesFormData,
  PropertyFeaturesFormSchema,
} from "features/properties";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { FilesView } from "components/shared/form/FileItem";
import TextAreaGroup from "components/shared/form/TextAreaGroup";
import { DEFAULT_HAS_RENTER_VALUE } from "features/properties/components/BuyingOptionsForm";

export interface PropertyFeaturesFormProps {
  propertyCategory: PropertyCategory;
  formSchema: PropertyFeaturesFormSchema;
  formValues: PropertyFeaturesFormData;
  setFormValue: UseFormSetValue<PropertyFeaturesFormData>;
  triggerForm: UseFormTrigger<PropertyFeaturesFormData>;
}

interface PropertyTypeOptionsConfig {
  options: SelectOption<PropertyType>[];
  default?: SelectOption<PropertyType>;
}

const DEFAULT_IS_FINISHED_VALUE = "false";

const PropertyFeaturesForm = ({
  propertyCategory,
  formSchema,
  formValues,
  setFormValue,
  triggerForm,
}: PropertyFeaturesFormProps) => {
  const [isFinished, setIsFinished] = useState<string>(
    DEFAULT_HAS_RENTER_VALUE
  );
  const handleFilesChange = (
    id: keyof PropertyFeaturesFormData,
    files: FileList
  ) => {
    setFormValue(id, files);
  };

  return (
    <Form>
      <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
        <Typography as="h3" variant="h4" className="mb-10">
          Property Properties
        </Typography>
        <FileInputGroup
          inputSchema={formSchema.images}
          accept="video/*, image/*"
          uploadBody={{
            text: "Upload images or video",
            icon: <AddPhotoAlternateOutlinedIcon />,
          }}
          label="Upload property images (upto 15)"
          maxFilesNumber={15}
          filesView={FilesView.GRID}
          multiple={true}
        />
        <InputGroup inputSchema={formSchema.title} label="Title*" />
        <TextAreaGroup
          label="Description"
          inputSchema={formSchema.description}
          placeholder="Tell us about your proeprty here"
        />
        <InputGroup
          inputSchema={formSchema.area}
          label="Area"
          placeholder="m2"
        />
        <InputGroup
          inputSchema={formSchema.capacity}
          label="Capacity"
          placeholder="e.g. 3"
        />
      </div>
    </Form>
  );
};

export default PropertyFeaturesForm;
