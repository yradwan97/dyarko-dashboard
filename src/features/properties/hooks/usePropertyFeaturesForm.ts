import { FormInputSchema } from "types";
import { useForm } from "react-hook-form";
import { FormInputSchemaUtils } from "utils/formUtils";

export interface PropertyFeaturesFormSchema {
  images: FormInputSchema<"images">;
  title: FormInputSchema<"title">;
  description: FormInputSchema<"description">;
  area: FormInputSchema<"area">;
  capacity: FormInputSchema<"capacity">;
  bedrooms: FormInputSchema<"bedrooms">;
  bathrooms: FormInputSchema<"bathrooms">;
  isFinished: FormInputSchema<"isFinished">;
  amenities: FormInputSchema<"amenities">;
  interiorDesign: FormInputSchema<"interiorDesign">;
}

export interface PropertyFeaturesFormData {
  images: FileList;
  title: string;
  area: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  isFinished: boolean;
  amenities: string;
  interiorDesign?: File;
  description?: string;
}

export const usePropertyFeaturesForm = () => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
    control,
  } = useForm<PropertyFeaturesFormData>({
    mode: "onTouched",
  });

  const formInputSchemaUtils =
    new FormInputSchemaUtils<PropertyFeaturesFormData>(register);

  const formSchema: PropertyFeaturesFormSchema = {
    title: formInputSchemaUtils.getInputFieldSchema("title", errors.title, {
      required: "Title is required",
    }),
    description: formInputSchemaUtils.getInputFieldSchema(
      "description",
      errors.description
    ),
    images: formInputSchemaUtils.getInputFieldSchema("images", errors.images, {
      validate: {
        validateMinImagesNumber: (value) => {
          return value.length > 0 || "At least one image or video is required";
        },
        validateMaxImagesNumber: (value) => {
          return value.length <= 15 || "Maximum images/videos is 15";
        },
        validateMaxVideosNumber: (value) => {
          const videosNumber = Array.from(value).reduce(
            (videosNumber, file) =>
              file.type === "video/*" ? ++videosNumber : videosNumber,
            0
          );
          return videosNumber <= 1 || "Only one video is allowed";
        },
      },
    }),
    area: formInputSchemaUtils.getInputFieldSchema("area", errors.area, {
      valueAsNumber: true,
    }),
    capacity: formInputSchemaUtils.getInputFieldSchema(
      "capacity",
      errors.capacity,
      {
        valueAsNumber: true,
      }
    ),
    bedrooms: formInputSchemaUtils.getInputFieldSchema(
      "bedrooms",
      errors.bedrooms
    ),
    bathrooms: formInputSchemaUtils.getInputFieldSchema(
      "bathrooms",
      errors.bathrooms
    ),
    isFinished: formInputSchemaUtils.getInputFieldSchema(
      "isFinished",
      errors.isFinished
    ),
    amenities: formInputSchemaUtils.getInputFieldSchema(
      "amenities",
      errors.amenities
    ),
    interiorDesign: formInputSchemaUtils.getInputFieldSchema(
      "interiorDesign",
      errors.interiorDesign
    ),
  };

  return {
    formSchema,
    errors,
    trigger,
    getValues,
    watch,
    setValue,
    control,
  };
};
