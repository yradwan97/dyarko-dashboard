import { ReactNode, useEffect, useState } from "react";
import { Map, Modal, Typography } from "components/shared/UI";
import { useForm } from "react-hook-form";
import {
  setEditProperty,
  toggleActiveEditPropertyModal,
} from "features/properties/slices/createPropertyModalSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { IoIosCloseCircle } from "react-icons/io";
import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  IconButton,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import i18next, { t } from "i18next";
import { PropertyService, Tent, toggleIsUpdating } from "features/properties";
import { GoDotFill } from "react-icons/go";
import { MdArrowDropDown } from "react-icons/md";
import {
  propertyCategorysItems,
  PropertyCategoryItem,
} from "../create/SelectCategory";
import { Amenity } from "features/properties/amenities";
import { Nullable } from "types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { axiosInstance } from "services/axiosInstance";
import { toastifyClient } from "services/toastifyClient";

const EditPropertyModal = () => {
  const { isEditActive, editProperty: property } = useAppSelector(
    (state) => state.createPropertyModal
  );
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [mainImageDeleted, setMainImageDeleted] = useState(false);
  
  // images coming in with property, local state to manipulate them
  const [propertyImages, setPropertyImages] = useState<Nullable<string[]>>([]);
  
  // local state to hold the new uploaded images array (files) and data urls to display them
  const [propertyImagesFiles, setPropertyImagesFiles] = useState<
  Nullable<any[]>
  >([]);
  const [newPropertyImages, setNewPropertyImages] = useState<Nullable<any[]>>(
    []
  );
  
  // local state to handle deleting any of the images that came with the property
  const [deletedImages, setDeletedImages] = useState<Nullable<string[]>>([]);
  
  // file to store new main image, data url to display the image
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  
  const [interiorDesignFile, setInteriorDesignFile] = useState(null);
  const [interiorDesignDataURL, setInteriorDesignDataURL] = useState(null);
  const [interiorDesignDeleted, setInteriorDesignDeleted] = useState(false);
  
  const isRtl = i18next.language === "ar";
  const hasLatLng =
    property && property?.lat !== null && property?.long !== null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm({ defaultValues: property! });

  const keysToWatch = [
    "auto_no",
    "is_daily",
    "is_weekly",
    "is_monthly",
    "daily_price",
    "weekly_price",
    "monthly_price",
    "insurance",
    "description",
    "bedrooms",
    "bathrooms",
    "area",
    "is_finished",
    "finish_type",
    "rules",
    "image",
    "edited_image",
    "images",
    "deleted_images",
    "interior_design",
    "edited_interior_design",
  ];
  
  const watchedFields = watch(keysToWatch);

  const updateProperty = async (values: any) => {
    const formData = new FormData();
    let changedKeys = isFormDirty().changedKeys;
    let dto: any = {};
    changedKeys.forEach((key) => {
      dto[key] = values[key];
    });
    keysToWatch.forEach((key) => {
      if (dto[key] === undefined || dto[key] === null) {
        dto[key] = property[key];
      }
    });
    for (const key in dto) {
      if (dto[key] === undefined) {
        delete dto[key];
      } else {
        if (
          [
            "image",
            "images",
            "edited_image",
            "deleted_images",
            "interior_design",
            "edited_interior_design",
          ].indexOf(key) > -1
        ) {
          if (key === "image") {
            if (changedKeys.indexOf("image") === -1) {
              formData.set("edited_image", dto["image"]);
            } else {
              typeof dto['image'] !== 'string' && formData.set("image", dto["image"] !== null ? dto["image"][0] : "null");
              dto['image'] === null && formData.set("edited_image", "null")
            }
          }
          if (key === "deleted_images" || key === "images") {
            let files = dto[key];
            if (files.length > 0) {
              // @ts-ignore
              for (let i = 0; i< files.length ; i++) {
                if (typeof files[i] === 'string') continue
                formData.append(`images`, files[i]);
              }
            }
          }
          if (key === "edited_interior_design" || key === "interior_design") {
            if (changedKeys.indexOf("interior_design") === -1) {
              formData.set("edited_interior_design", dto["interior_design"]);
            } else {
              typeof dto['interior_design'] !== 'string' && formData.set(
                "interior_design",
                dto["interior_design"] !== null ? dto["interior_design"][0] : null
              );
            }
          }
        } else if (["is_daily", "is_weekly", "is_monthly"].indexOf(key) > -1) {
            formData.set(key, dto[key].toString());
        } else if (
          ["daily_price", "weekly_price", "monthly_price"].indexOf(key) > -1
        ) {
          if (dto[key] !== 0 && dto[key] !== "0") {
            formData.set(key, dto[key].toString());
          } else {
            continue;
          }
        } else {
          formData.set(
            key.toString(),
            dto[key] !== null ? dto[key].toString() : null
          );
        }
      }
    }

    console.log([...formData.entries()]);

    dispatch(toggleIsUpdating());
    try {
      let res = await axiosInstance.put(
        `/properties/${property?._id}`,
        formData
      );
      toastifyClient.success({ message: "property updated" });
      onCloseModal();
    } catch (e) {
      console.error(e);
      toastifyClient.error({ message: "property update failed" });
    }
    dispatch(toggleIsUpdating());
  };

  useEffect(() => {
    if (mainImageDeleted) {
      setValue("image", null);
    }
  }, [mainImageDeleted]);

  useEffect(() => {
    if (interiorDesignDeleted) {
      setValue("edited_interior_design", null);
      setValue("interior_design", null);
    }
  }, [interiorDesignDeleted]);

  useEffect(() => {
    if (deletedImages?.length! > 0) {
      setValue(`deleted_images`, JSON.stringify(deletedImages!));
    }
  }, [deletedImages]);

  useEffect(() => {
    console.log(getValues())
    if (
      property?.images &&
      property?.images.length > 0 &&
      property?.images.every((i: string) => i)
    )
      setPropertyImages(property?.images!);
  }, [property]);

  const handleMainImageChange = (file: any) => {
    setFile(null);
    setFileDataURL(null);

    // const file = e.target.files[0];
    setFile(file);
  };

  const handleInteriorDesignImageChange = (file: any) => {
    setInteriorDesignFile(null);
    setInteriorDesignDataURL(null);

    // const file = e.target.files[0];
    setInteriorDesignFile(file);
  };

  useEffect(() => {
    if (
      getValues("image") &&
      typeof getValues("image") !== "string" &&
      getValues("image").length &&
      getValues("image").length > 0
    ) {
      handleMainImageChange(getValues("image")[0]!);
    }
  }, [getValues("image")]);

  useEffect(() => {
    if (
      getValues("interior_design") &&
      typeof getValues("interior_design") !== "string" &&
      getValues("interior_design").length &&
      getValues("interior_design").length > 0
    ) {
      handleInteriorDesignImageChange(getValues("interior_design")[0]!);
    }
  }, [getValues("interior_design")]);

  useEffect(() => {
    if (
      getValues("images") &&
      Object.values(getValues("images")!).every(
        (i: any) => typeof i !== "string"
      ) &&
      getValues("images").length &&
      getValues("images").length > 0
    ) {
      console.count("in images uef");
      setPropertyImagesFiles(getValues("images")!);
    }
  }, [getValues("images")]);

  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    if (interiorDesignFile) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setInteriorDesignDataURL(result);
        }
      };
      fileReader.readAsDataURL(interiorDesignFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [interiorDesignFile]);

  useEffect(() => {
    const readFiles = async () => {
      const promises = Object.values(propertyImagesFiles!).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target!.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });

      try {
        const results = await Promise.all(promises);
        setNewPropertyImages(results as string[]);
      } catch (error) {
        console.error("Error reading files:", error);
      }
    };

    if (propertyImagesFiles!.length > 0) {
      readFiles();
    }
  }, [propertyImagesFiles]);

  const handleRemoveSingleImage = (index: number) => {
    confirmAlert({
      title: "Confirm delete image?",
      overlayClassName: "z-[1100]",
      message: "Are you sure you want to delete this image?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const updatedPropertyImages = [...propertyImages!];
            const removedImage = updatedPropertyImages[index];
            setDeletedImages([...deletedImages!, removedImage]);
            updatedPropertyImages.splice(index, 1);
            setPropertyImages(updatedPropertyImages);
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const handleMainImageDelete = () => {
    confirmAlert({
      title: "Confirm delete image?",
      overlayClassName: "z-[1100]",
      message: "Are you sure you want to delete this image?",
      buttons: [
        {
          label: "Yes",
          onClick: () => setMainImageDeleted(true),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const handleInteriorDesignImageDelete = () => {
    confirmAlert({
      title: "Confirm delete image?",
      overlayClassName: "z-[1100]",
      message: "Are you sure you want to delete this image?",
      buttons: [
        {
          label: "Yes",
          onClick: () => setInteriorDesignDeleted(true),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (property !== null) {
      setValue("payment_type", property?.payment_type!);
      setValue("category", property?.category!);
    }
  }, [property]);

  const isFormDirty = () => {
    const changedKeys: string[] = [];
    if (property!) {
      for (const key in watchedFields) {
        // @ts-ignore
        if (watchedFields[key] !== property[keysToWatch[key]]) {
          changedKeys.push(keysToWatch[key]);
        }
      }
    }
    return {
      isDirty: changedKeys.length > 0,
      changedKeys,
    };
  };

  const formatTextToI18NKey = (param: string) => {
    return param.replaceAll(" ", "_").replaceAll("-", "_");
  };

  const onCloseModal = () => {
    clearErrors();
    reset();
    dispatch(setEditProperty(null));
    dispatch(toggleActiveEditPropertyModal());
  };

  return (
    <>
      <Modal isOpen={isEditActive} onClose={onCloseModal}>
        {property !== null ? (
          <div className="flex flex-col space-y-5">
            <Typography
              variant="h3"
              as="h2"
              className="text-center mt-8 capitalize"
            >
              {t("pages.properties.edit.edit-property")}
            </Typography>

            <form
              onSubmit={handleSubmit(async (values) => {
                clearErrors("paymentFrequency");
                if (
                  property?.payment_type === "rent" &&
                  !getValues("is_daily") &&
                  !getValues("is_weekly") &&
                  !getValues("is_monthly")
                ) {
                  setError("paymentFrequency", {
                    message: "Payment frequency is required",
                  });
                  return;
                }
                await updateProperty(values);
              })}
            >
              <>
                <FormLabel
                  fontSize="2rem"
                  textAlign={"center"}
                  textTransform="capitalize"
                  textDecoration={"underline"}
                  mt={10}
                >
                  {t("pages.properties.create.steps.buying-options")}
                </FormLabel>
                <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
                  <RadioGroup isDisabled defaultValue="rent">
                    <SimpleGrid
                      columns={{ base: 2, md: 3, lg: 5 }}
                      spacing={2}
                      mb={6}
                    >
                      <Box
                        borderColor="gray.200"
                        borderStyle="solid"
                        borderWidth={1}
                        borderRadius={4}
                        paddingBlock={2}
                        paddingInline={8}
                      >
                        <Radio
                          {...register("payment_type")}
                          value="rent"
                          color="red"
                          size="lg"
                        >
                          {t("payment-types.rent")}
                        </Radio>
                      </Box>
                      <Box
                        borderColor="gray.200"
                        borderStyle="solid"
                        borderWidth={1}
                        borderRadius={4}
                        paddingBlock={2}
                        paddingInline={8}
                      >
                        <Radio
                          {...register("payment_type")}
                          value="cash"
                          color="red"
                          size="lg"
                        >
                          {t("payment-types.cash")}
                        </Radio>
                      </Box>
                      <Box
                        borderColor="gray.200"
                        borderStyle="solid"
                        borderWidth={1}
                        borderRadius={4}
                        paddingBlock={2}
                        paddingInline={isRtl ? 8 : 3}
                      >
                        <Radio
                          {...register("payment_type")}
                          value="installment"
                          color="red"
                          size="lg"
                        >
                          {t("payment-types.installment")}
                        </Radio>
                      </Box>
                      <Box
                        borderColor="gray.200"
                        borderStyle="solid"
                        borderWidth={1}
                        borderRadius={4}
                        paddingBlock={2}
                        paddingInline={8}
                      >
                        <Radio
                          {...register("payment_type")}
                          value="share"
                          color="red"
                          size="lg"
                        >
                          {t("payment-types.share")}
                        </Radio>
                      </Box>
                      <Box
                        borderColor="gray.200"
                        borderStyle="solid"
                        borderWidth={1}
                        width={"110%"}
                        borderRadius={4}
                        paddingBlock={2}
                        paddingInline={isRtl ? 12 : 2}
                      >
                        <Radio
                          {...register("payment_type")}
                          value="replacement"
                          color="red"
                          size="lg"
                        >
                          {t("payment-types.replacement")}
                        </Radio>
                      </Box>
                    </SimpleGrid>
                  </RadioGroup>

                  {getValues("payment_type") === "rent" && (
                    <FormControl width={"100%"} py={2}>
                      <RadioGroup
                        defaultValue={
                          property ? property?.has_renter!.toString() : "false"
                        }
                        isDisabled
                        width={"fit-content"}
                        py={2}
                      >
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("pages.properties.create.has-renter")}
                        </FormLabel>
                        <Radio
                          {...register("has_renter")}
                          mb={4}
                          value="true"
                          size="lg"
                          textTransform={"capitalize"}
                          me={10}
                        >
                          {t("general.yes")}
                        </Radio>
                        <Radio
                          textTransform={"capitalize"}
                          {...register("has_renter")}
                          mb={4}
                          value="false"
                          size="lg"
                        >
                          {t("general.no")}
                        </Radio>
                      </RadioGroup>
                    </FormControl>
                  )}

                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {getValues("has_renter") && (
                      <>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.renter-id")}
                          </FormLabel>
                          <Input
                            type="text"
                            height="45px"
                            borderColor="gray.200"
                            borderWidth={1}
                            borderStyle="solid"
                            isDisabled
                            value={property?.rent_details?.user}
                            placeholder={`${t(
                              "pages.properties.create.renter-id"
                            )}`}
                            textTransform="capitalize"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.rent-start-date")}
                          </FormLabel>
                          <Input
                            type="text"
                            isDisabled
                            value={format(
                              new Date(property?.rent_details?.start_date!),
                              "dd/MM/yyyy"
                            )}
                            height="45px"
                            borderColor="gray.200"
                            borderWidth={1}
                            borderStyle="solid"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.rent-end-date")}
                          </FormLabel>
                          <Input
                            type="text"
                            isDisabled
                            value={format(
                              new Date(property?.rent_details?.end_date!),
                              "dd/MM/yyyy"
                            )}
                            height="45px"
                            borderColor="gray.200"
                            borderWidth={1}
                            borderStyle="solid"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.rent-type")}
                          </FormLabel>
                          <RadioGroup
                            isDisabled
                            defaultValue={
                              property?.has_renter && property?.rent_details
                                ? property?.rent_details!.rent_type
                                : "daily"
                            }
                          >
                            <FormControl>
                              <Radio mb={4} value="daily" size="lg" me={6}>
                                {t("general.daily")}
                              </Radio>
                              <Radio mb={4} value="weekly" size="lg" me={6}>
                                {t("general.weekly")}
                              </Radio>
                              <Radio mb={4} value="monthly" size="lg">
                                {t("general.monthly")}
                              </Radio>
                            </FormControl>
                          </RadioGroup>
                        </FormControl>
                      </>
                    )}
                  </div>
                  <hr className="my-5" />

                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {getValues("payment_type") === "rent" && (
                      <>
                        <FormLabel fontSize={"1rem"}>
                          {t("pages.properties.create.payment-frequency")} *
                        </FormLabel>
                        <Flex gap={2} direction={"column"}>
                          <Stack direction={"row"} spacing={3}>
                            {getValues("category") !== "land" &&
                              getValues("category") !== "farm" && (
                                <Checkbox {...register("is_daily")} mb={1}>
                                  {t("pages.properties.create.is-daily")}
                                </Checkbox>
                              )}

                            {getValues("category") !== "land" &&
                              getValues("category") !== "farm" && (
                                <Checkbox {...register("is_weekly")} mb={1}>
                                  {t("pages.properties.create.is-weekly")}
                                </Checkbox>
                              )}

                            {getValues("category") !== "caravan" &&
                              getValues("category") !== "tent_group" && (
                                <Checkbox {...register("is_monthly")} mb={1}>
                                  {t("pages.properties.create.is-monthly")}
                                </Checkbox>
                              )}
                          </Stack>
                          {errors.paymentFrequency && (
                            <Text
                              textColor="red"
                              mt={1}
                              fontSize="sm"
                              textTransform="capitalize"
                              fontWeight={"medium"}
                            >
                              {errors.paymentFrequency.message as ReactNode}
                            </Text>
                          )}
                        </Flex>
                        {getValues("is_daily") && (
                          <>
                            <FormControl>
                              <FormLabel
                                fontSize="1rem"
                                textTransform="capitalize"
                              >
                                {t("pages.properties.create.daily-price")}
                              </FormLabel>
                              <NumberInput min={1} defaultValue={property?.daily_price!}>
                                <NumberInputField
                                  height="45px"
                                  borderColor="gray.200"
                                  borderWidth={1}
                                  borderStyle="solid"
                                  placeholder={`${t(
                                    "pages.properties.create.daily-price"
                                  )}`}
                                  textTransform="capitalize"
                                  {...register("daily_price", {
                                    required: `${t(
                                      "pages.properties.create.validation.daily-price"
                                    )}`,
                                  })}
                                />
                              </NumberInput>
                              {errors.daily_price && (
                                <Text
                                  textColor="red"
                                  mt={4}
                                  fontSize="sm"
                                  textTransform="capitalize"
                                >
                                  {errors.daily_price.message as ReactNode}
                                </Text>
                              )}
                            </FormControl>
                          </>
                        )}

                        {getValues("is_weekly") && (
                          <>
                            <FormControl>
                              <FormLabel
                                fontSize="1rem"
                                textTransform="capitalize"
                              >
                                {t("pages.properties.create.weekly-price")}
                              </FormLabel>
                              <NumberInput min={1} defaultValue={property?.weekly_price!}>
                                <NumberInputField
                                  height="45px"
                                  borderColor="gray.200"
                                  borderWidth={1}
                                  borderStyle="solid"
                                  placeholder={`${t(
                                    "pages.properties.create.weekly-price"
                                  )}`}
                                  textTransform="capitalize"
                                  {...register("weekly_price", {
                                    required: `${t(
                                      "pages.properties.create.validation.weekly-price"
                                    )}`,
                                  })}
                                />
                              </NumberInput>
                              {errors.weekly_price && (
                                <Text
                                  textColor="red"
                                  mt={4}
                                  fontSize="sm"
                                  textTransform="capitalize"
                                >
                                  {errors.weekly_price.message as ReactNode}
                                </Text>
                              )}
                            </FormControl>
                          </>
                        )}

                        {getValues("is_monthly") && (
                          <>
                            <FormControl>
                              <FormLabel
                                fontSize="1rem"
                                textTransform="capitalize"
                              >
                                {t("pages.properties.create.monthly-price")}
                              </FormLabel>
                              <NumberInput min={1} defaultValue={property?.monthly_price}>
                                <NumberInputField
                                  height="45px"
                                  borderColor="gray.200"
                                  borderWidth={1}
                                  borderStyle="solid"
                                  placeholder={`${t(
                                    "pages.properties.create.monthly-price"
                                  )}`}
                                  textTransform="capitalize"
                                  {...register("monthly_price", {
                                    required: `${t(
                                      "pages.properties.create.validation.monthly-price"
                                    )}`,
                                  })}
                                />
                              </NumberInput>
                              {errors.monthly_price && (
                                <Text
                                  textColor="red"
                                  mt={4}
                                  fontSize="sm"
                                  textTransform="capitalize"
                                >
                                  {errors.monthly_price.message as ReactNode}
                                </Text>
                              )}
                            </FormControl>
                            <FormControl>
                              <FormLabel
                                fontSize="1rem"
                                textTransform="capitalize"
                              >
                                {t("pages.properties.create.minimum-months")}
                              </FormLabel>
                              <NumberInput min={1} defaultValue={property?.min_months!}>
                                <NumberInputField
                                  height="45px"
                                  borderColor="gray.200"
                                  borderWidth={1}
                                  borderStyle="solid"
                                  placeholder={`${t(
                                    "pages.properties.create.minimum-months"
                                  )}`}
                                  textTransform="capitalize"
                                  {...register("min_months", {
                                    required: `${t(
                                      "pages.properties.create.validation.minimum-months"
                                    )}`,
                                  })}
                                />
                              </NumberInput>
                              {errors.min_months && (
                                <Text
                                  textColor="red"
                                  mt={4}
                                  fontSize="sm"
                                  textTransform="capitalize"
                                >
                                  {errors.min_months.message as ReactNode}
                                </Text>
                              )}
                            </FormControl>
                          </>
                        )}
                      </>
                    )}

                    {(getValues("payment_type") === "cash" ||
                      getValues("payment_type") === "share" ||
                      getValues("payment_type") === "replacement") && (
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("pages.properties.create.owner-mobile")}
                        </FormLabel>
                        <Input
                          type="text"
                          height="45px"
                          borderColor="gray.200"
                          placeholder="owner phone number"
                          borderWidth={1}
                          borderStyle="solid"
                          textTransform="capitalize"
                          {...register("owner_phone", {
                            required: `${t(
                              "pages.properties.create.validation.owner-mobile"
                            )}`,
                            pattern: {
                              value: /^\d{8}$/,
                              message: `${t(
                                "pages.properties.create.validation.value.owner-mobile"
                              )}`,
                            },
                          })}
                        />
                        {errors.owner_phone && (
                          <Text
                            textColor="red"
                            mt={4}
                            fontSize="sm"
                            textTransform="capitalize"
                          >
                            {errors.owner_phone.message as ReactNode}
                          </Text>
                        )}
                      </FormControl>
                    )}

                    {getValues("payment_type") !== "installment" ? (
                      <>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.insurance")}
                          </FormLabel>
                          <NumberInput min={0} defaultValue={property?.insurance}>
                            <NumberInputField
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={
                                t("pages.properties.create.insurance")!
                              }
                              textTransform="capitalize"
                              {...register("insurance", {
                                required: `${t(
                                  "pages.properties.create.validation.insurance"
                                )}`,
                              })}
                            />
                          </NumberInput>
                          {errors.insurance && (
                            <Text
                              textColor="red"
                              mt={4}
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {errors.insurance.message as ReactNode}
                            </Text>
                          )}
                        </FormControl>
                      </>
                    ) : (
                      <>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("general.price")}
                          </FormLabel>
                          <NumberInput min={1} defaultValue={property?.price}>
                            <NumberInputField
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={t("general.price")!}
                              textTransform="capitalize"
                              {...register("price", {
                                required: `${t(
                                  "pages.properties.create.validation.price"
                                )}`,
                              })}
                            />
                          </NumberInput>
                          {errors.price && (
                            <Text
                              textColor="red"
                              mt={4}
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {errors.price.message as ReactNode}
                            </Text>
                          )}
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t(
                              "pages.properties.create.max-installment-period"
                            )}
                          </FormLabel>
                          <NumberInput min={1} defaultValue={property?.max_installment_period}>
                            <NumberInputField
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={
                                t(
                                  "pages.properties.create.max-installment-period"
                                )!
                              }
                              textTransform="capitalize"
                              {...register("max_installment_period", {
                                required: `${t(
                                  "pages.properties.create.validation.max-installment-period"
                                )}`,
                              })}
                            />
                          </NumberInput>
                          {errors.max_installment_period && (
                            <Text
                              textColor="red"
                              mt={4}
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {
                                errors.max_installment_period
                                  .message as ReactNode
                              }
                            </Text>
                          )}
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("general.down-payment")}
                          </FormLabel>
                          <NumberInput min={1} defaultValue={property?.down_payment}>
                            <NumberInputField
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={t("general.down-payment")!}
                              textTransform="capitalize"
                              {...register("down_payment", {
                                required: `${t(
                                  "pages.properties.create.validation.down-payment"
                                )}`,
                              })}
                            />
                          </NumberInput>
                          {errors.down_payment && (
                            <Text
                              textColor="red"
                              mt={4}
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {errors.down_payment.message as ReactNode}
                            </Text>
                          )}
                        </FormControl>
                      </>
                    )}
                  </div>
                </div>
                <>
                  <FormLabel
                    fontSize="2rem"
                    textAlign={"center"}
                    textTransform="capitalize"
                    textDecoration={"underline"} 
                    mt={10}
                  >
                    {t("pages.properties.create.steps.property-details")}
                  </FormLabel>
                  <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("general.type")}
                        </FormLabel>
                        <Select
                          height="45px"
                          borderColor="gray.200"
                          borderWidth={1}
                          borderStyle="solid"
                          isDisabled
                          icon={
                            <MdArrowDropDown
                              style={{
                                position: "absolute",
                                right: "auto",
                                left: "0",
                              }}
                            />
                          }
                          textTransform="capitalize"
                          right={"auto"}
                          left={0}
                        >
                          <option value={property?.type}>
                            {t(`general.types.${property?.type}`)}
                          </option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("general.class")}
                        </FormLabel>
                        <Select
                          height="45px"
                          borderColor="gray.200"
                          borderWidth={1}
                          borderStyle="solid"
                          disabled
                          textTransform="capitalize"
                        >
                          <option value={property?.class}>
                            {t(`general.classes.${property?.class}`)}
                          </option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <FormControl marginBlock={4}>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("general.auto-no")}
                      </FormLabel>
                      <Input
                        // type="text"
                        height="45px"
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        // value={property && property?.auto_no}
                        placeholder={t("general.auto-no")!}
                        {...register("auto_no", {
                          required: `${t(
                            "pages.properties.create.validation.auto-no"
                          )}`,
                        })}
                      />
                      {errors.auto_no && (
                        <Text
                          textColor="red"
                          mt={1}
                          fontSize="sm"
                          textTransform="capitalize"
                          fontWeight={"medium"}
                        >
                          {errors.auto_no.message as ReactNode}
                        </Text>
                      )}
                    </FormControl>

                    <Stack direction={"row"} spacing={2}>
                      {hasLatLng && (
                        <FormControl>
                          <Map
                            isDraggable={false}
                            widthClassname="w-4/5"
                            latitude={
                              property ? property?.lat : 29.2799283891296
                            }
                            longitude={
                              property ? property?.long : 47.90808142031251
                            }
                          />
                        </FormControl>
                      )}
                      <Stack direction={"column"} spacing={2}>
                        <Stack direction={"row"} spacing={2}>
                          <FormControl>
                            <FormLabel
                              fontSize="1rem"
                              textTransform="capitalize"
                            >
                              {t("pages.properties.create.lat")}
                            </FormLabel>
                            <Input
                              type="string"
                              height="45px"
                              disabled
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={`${t(
                                "pages.properties.create.lat"
                              )}`}
                              value={property && property.lat.toFixed(5)}
                              textTransform="capitalize"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel
                              fontSize="1rem"
                              textTransform="capitalize"
                            >
                              {t("pages.properties.create.long")}
                            </FormLabel>
                            <Input
                              type="string"
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={`${t(
                                "pages.properties.create.long"
                              )}`}
                              disabled
                              value={property && property.long.toFixed(5)}
                              textTransform="capitalize"
                            />
                            {errors.long && (
                              <Text
                                textColor="red"
                                mt={1}
                                fontSize="sm"
                                textTransform="capitalize"
                                fontWeight={"medium"}
                              >
                                {errors.long.message as ReactNode}
                              </Text>
                            )}
                          </FormControl>
                        </Stack>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("general.city")} *
                          </FormLabel>
                          <Select
                            // type="text"
                            height="45px"
                            borderColor="gray.200"
                            borderWidth={1}
                            disabled
                            borderStyle="solid"
                            // placeholder={`${t("general.city")}`}
                            textTransform="capitalize"
                            {...register("city", {
                              required: `${t(
                                "pages.properties.create.validation.city"
                              )}`,
                            })}
                          >
                            <option value={property?.city}>
                              {t(
                                `gov.name.${formatTextToI18NKey(
                                  property?.city!
                                )}`
                              )}
                            </option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("general.region")} *
                          </FormLabel>
                          <Select
                            // type="text"
                            height="45px"
                            borderColor="gray.200"
                            borderWidth={1}
                            borderStyle="solid"
                            disabled
                            placeholder={`${t("general.region")}`}
                            textTransform="capitalize"
                            {...register("region", {
                              required: `${t(
                                "pages.properties.create.validation.region"
                              )}`,
                            })}
                          >
                            <option value={property?.region}>
                              {t(
                                `regions.name.${formatTextToI18NKey(
                                  property?.region!
                                )}`
                              )}
                            </option>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    {getValues("payment_type") === "replacement" && (
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("general.replace")} *{" "}
                        </FormLabel>
                        <Select
                          height="45px"
                          borderColor="gray.200"
                          placeholder={t("general.replace-category")!}
                          borderWidth={1}
                          borderStyle="solid"
                          textTransform="capitalize"
                          {...register("replace_with", {
                            required: `${t(
                              "pages.properties.create.validation.replace"
                            )}`,
                          })}
                        >
                          {propertyCategorysItems?.map(
                            (
                              propertyCategory: PropertyCategoryItem,
                              index: number
                            ) => (
                              <option
                                key={index}
                                value={propertyCategory.propertyCategory}
                              >
                                {propertyCategory.label}
                              </option>
                            )
                          )}
                        </Select>
                        {errors.replace_with && (
                          <Text
                            textColor="red"
                            mt={1}
                            fontSize="sm"
                            textTransform="capitalize"
                            fontWeight={"medium"}
                          >
                            {errors.replace_with.message as ReactNode}
                          </Text>
                        )}
                      </FormControl>
                    )}

                    {(auth?.user.role === "agent" ||
                      auth?.user.role === "broker") && (
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("general.commission")} *
                        </FormLabel>
                        <NumberInput min={0}>
                          <NumberInputField
                            height="45px"
                            borderColor="gray.200"
                            borderWidth={1}
                            borderStyle="solid"
                            placeholder={`${t("general.commission")}`}
                            textTransform="capitalize"
                            {...register("commission", {
                              required: `${t(
                                "pages.properties.create.validation.commission"
                              )}`,
                            })}
                          />
                        </NumberInput>
                        {errors.commission && (
                          <Text
                            textColor="red"
                            mt={1}
                            fontSize="sm"
                            textTransform="capitalize"
                            fontWeight={"medium"}
                          >
                            {errors.commission.message as ReactNode}
                          </Text>
                        )}
                      </FormControl>
                    )}
                  </div>
                </>
                <FormLabel
                  fontSize="2rem"
                  textAlign={"center"}
                  textTransform="capitalize"
                  textDecoration={"underline"}
                  mt={10}
                >
                  {t("pages.properties.create.steps.property-features")}
                </FormLabel>
                <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left"> 
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.main-image")}
                      </FormLabel>
                      {property?.image !== null && !mainImageDeleted && (
                        <Card size={"sm"} width={"40%"} mb={4}>
                          <CardBody position={"relative"}>
                            <IconButton
                              onClick={handleMainImageDelete}
                              aria-label="delete-image"
                              size={"md"}
                              right={1}
                              top={2}
                              isRound
                              variant={"ghost"}
                              position={"absolute"}
                              icon={
                                <IoIosCloseCircle fill="red" stroke="black" />
                              }
                            />
                            <Image src={property?.image!} borderRadius="lg" />
                          </CardBody>
                        </Card>
                      )}
                      {fileDataURL && (
                        <Card size={"sm"} width={"40%"} mb={4}>
                          <CardBody position={"relative"}>
                            <IconButton
                              onClick={() => {
                                setFile(null);
                                setFileDataURL(null);
                              }}
                              aria-label="delete-image"
                              size={"md"}
                              right={1}
                              top={2}
                              isRound
                              variant={"ghost"}
                              position={"absolute"}
                              icon={
                                <IoIosCloseCircle fill="red" stroke="black" />
                              }
                            />
                            <Image src={fileDataURL} borderRadius="lg" />
                          </CardBody>
                        </Card>
                      )}
                      <Input
                        type="file"
                        height="45px"
                        isDisabled={(!mainImageDeleted && property?.image !== null) || (mainImageDeleted && fileDataURL !== null)}
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        textTransform="capitalize"
                        pt="6px"
                        {...register("image")}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel
                        fontSize="1rem"
                        textTransform="capitalize"
                        mt={4}
                      >
                        {t("pages.properties.create.images")}
                      </FormLabel>
                      {propertyImages!.length > 0 && (
                        <>
                          <FormLabel
                            fontSize="1rem"
                            textTransform="capitalize"
                            mt={5}
                          >
                            {t("pages.properties.create.current-images")}
                          </FormLabel>
                          <SimpleGrid
                            spacing={4}
                            mt={4}
                            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                            mb={4}
                          >
                            {propertyImages?.map((i, index) => (
                              <Card key={index}>
                                <CardBody>
                                  <IconButton
                                    aria-label="delete-image"
                                    onClick={() =>
                                      handleRemoveSingleImage(index)
                                    }
                                    size={"md"}
                                    right={3}
                                    top={3}
                                    isRound
                                    variant={"ghost"}
                                    position={"absolute"}
                                    icon={
                                      <IoIosCloseCircle
                                        fill="red"
                                        stroke="black"
                                      />
                                    }
                                  />
                                  <Image src={i} borderRadius={"lg"} />
                                </CardBody>
                              </Card>
                            ))}
                          </SimpleGrid>
                        </>
                      )}
                      {newPropertyImages!.length > 0 && (
                        <>
                          <FormLabel
                            fontSize="1rem"
                            textTransform="capitalize"
                            mt={5}
                          >
                            {t("pages.properties.create.new-images")}
                          </FormLabel>
                          <SimpleGrid
                            spacing={4}
                            mt={4}
                            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                            mb={4}
                          >
                            {newPropertyImages?.map((i, index) => (
                              <Card key={index}>
                                <CardBody>
                                  <IconButton
                                    aria-label="delete-image"
                                    onClick={() => {
                                      const updatedImages = [
                                        ...newPropertyImages,
                                      ];
                                      updatedImages.splice(index, 1);
                                      setNewPropertyImages([...updatedImages]);
                                      const updatedFiles = [
                                        ...propertyImagesFiles!,
                                      ].filter(
                                        (file: any) =>
                                          file.name !==
                                          propertyImagesFiles![index].name
                                      );
                                      setValue("images", updatedFiles);
                                    }}
                                    size={"md"}
                                    right={3}
                                    top={3}
                                    isRound
                                    variant={"ghost"}
                                    position={"absolute"}
                                    icon={
                                      <IoIosCloseCircle
                                        fill="red"
                                        stroke="black"
                                      />
                                    }
                                  />
                                  <Image src={i} borderRadius={"lg"} />
                                </CardBody>
                              </Card>
                            ))}
                          </SimpleGrid>
                        </>
                      )}
                      <Input
                        type="file"
                        multiple
                        height="45px"
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        textTransform="capitalize"
                        pt="6px"
                        {...register("images")}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.title")}
                      </FormLabel>
                      <Input
                        type="text"
                        height="45px"
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        placeholder={`${t("pages.properties.create.title")}`}
                        textTransform="capitalize"
                        {...register("title", {
                          required: `${t(
                            "pages.properties.create.validation.title"
                          )}`,
                        })}
                      />
                      {errors.title && (
                        <Text
                          textColor="red"
                          mt={4}
                          fontSize="sm"
                          textTransform="capitalize"
                        >
                          {errors.title.message as ReactNode}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.description")}
                      </FormLabel>
                      <Textarea
                        rows={4}
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        placeholder={`${t(
                          "pages.properties.create.description"
                        )}`}
                        textTransform="capitalize"
                        {...register("description", {
                          required: `${t(
                            "pages.properties.create.validation.description"
                          )}`,
                        })}
                      />
                      {errors.description && (
                        <Text
                          textColor="red"
                          mt={4}
                          fontSize="sm"
                          textTransform="capitalize"
                        >
                          {errors.description.message as ReactNode}
                        </Text>
                      )}
                    </FormControl>
                  </Stack>

                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={4}
                    marginBlock={4}
                  >
                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.area")}
                      </FormLabel>
                      <Input
                        type="text"
                        height="45px"
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        placeholder={`${t("pages.properties.create.area")}`}
                        textTransform="capitalize"
                        {...register("area", {
                          required: `${t(
                            "pages.properties.create.validation.area"
                          )}`,
                        })}
                      />
                      {errors.area && (
                        <Text
                          textColor="red"
                          mt={4}
                          fontSize="sm"
                          textTransform="capitalize"
                        >
                          {errors.area.message as ReactNode}
                        </Text>
                      )}
                    </FormControl>

                    {getValues("category") !== "land" &&
                      getValues("category") !== "farm" &&
                      getValues("category") !== "caravan" &&
                      getValues("category") !== "tent_group" && (
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.bedrooms")}
                          </FormLabel>
                         <NumberInput min={1} defaultValue={property?.bedrooms!}>
                            <NumberInputField
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={`${t(
                                "pages.properties.create.bedrooms"
                              )}`}
                              textTransform="capitalize"
                              {...register("bedrooms", {
                                required: `${t(
                                  "pages.properties.create.validation.bedrooms"
                                )}`,
                              })}
                            />
                         </NumberInput>
                          {errors.bedrooms && (
                            <Text
                              textColor="red"
                              mt={4}
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {errors.bedrooms.message as ReactNode}
                            </Text>
                          )}
                        </FormControl>
                      )}

                    {getValues("category") !== "land" &&
                      getValues("category") !== "farm" &&
                      getValues("category") !== "caravan" &&
                      getValues("category") !== "tent_group" && (
                        <FormControl>
                          <FormLabel fontSize="1rem" textTransform="capitalize">
                            {t("pages.properties.create.bathrooms")}
                          </FormLabel>
                          <NumberInput min={1} defaultValue={property?.bathrooms!}>
                            <NumberInputField
                              height="45px"
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              placeholder={`${t(
                                "pages.properties.create.bathrooms"
                              )}`}
                              textTransform="capitalize"
                              {...register("bathrooms", {
                                required: `${t(
                                  "pages.properties.create.validation.bathrooms"
                                )}`,
                              })}
                            />
                          </NumberInput>
                          {errors.bathrooms && (
                            <Text
                              textColor="red"
                              mt={4}
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {errors.bathrooms.message as ReactNode}
                            </Text>
                          )}
                        </FormControl>
                      )}
                  </SimpleGrid>

                  <Stack spacing={4}>
                    {getValues("category") !== "land" &&
                      getValues("category") !== "farm" &&
                      getValues("category") !== "caravan" &&
                      getValues("category") !== "tent_group" && (
                        <RadioGroup
                          defaultValue={
                            property?.is_finished
                              ? property?.is_finished!.toString()
                              : "false"
                          }
                        >
                          <FormControl>
                            <FormLabel
                              fontSize="1rem"
                              textTransform="capitalize"
                            >
                              {t("pages.properties.create.is-finished")}
                            </FormLabel>
                            <Radio
                              {...register("is_finished")}
                              mb={4}
                              value="true"
                              size="lg"
                              me={10}
                            >
                              {t("general.yes")}
                            </Radio>
                            <Radio
                              {...register("is_finished")}
                              mb={4}
                              value="false"
                              size="lg"
                            >
                              {t("general.no")}
                            </Radio>
                          </FormControl>
                        </RadioGroup>
                      )}
                    {/* @ts-ignore */}
                    {getValues("is_finished") === "true" && (
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("pages.properties.create.finish-type")}
                        </FormLabel>
                        <Select
                          height="45px"
                          borderColor="gray.200"
                          borderWidth={1}
                          borderStyle="solid"
                          textTransform="capitalize"
                          {...register("finish_type", {
                            required: `${t(
                              "pages.properties.create.validation.finish-type"
                            )}`,
                          })}
                        >
                          <option value="none">
                            {t("pages.properties.create.finish-types.none")}
                          </option>
                          <option value="medium">
                            {t("pages.properties.create.finish-types.medium")}
                          </option>
                          <option value="lux">
                            {t("pages.properties.create.finish-types.lux")}
                          </option>
                          <option value="super_lux">
                            {t(
                              "pages.properties.create.finish-types.super-lux"
                            )}
                          </option>
                          <option value="ultra_super_lux">
                            {t("pages.properties.create.finish-types.ultra")}
                          </option>
                        </Select>
                        {errors.finish_type && (
                          <Text
                            textColor="red"
                            mt={4}
                            fontSize="sm"
                            textTransform="capitalize"
                          >
                            {errors.finish_type.message as ReactNode}
                          </Text>
                        )}
                      </FormControl>
                    )}

                    {(getValues("category") === "chalet" ||
                      getValues("category") === "tent_group") && (
                      <FormControl>
                        <Stack direction={"row"} spacing={20}>
                          <Stack direction={"column"} spacing={1}>
                            <FormLabel
                              fontSize="1rem"
                              textTransform="capitalize"
                            >
                              {t("pages.properties.create.capacity")} *
                            </FormLabel>
                            <NumberInput min={1} defaultValue={property?.capacity!}>
                              <NumberInputField
                                height="45px"
                                borderColor="gray.200"
                                borderWidth={1}
                                borderStyle="solid"
                                textTransform="capitalize"
                                {...register("capacity", {
                                  required: `${t(
                                    "pages.properties.create.validation.capacity"
                                  )}`,
                                })}
                              />
                            </NumberInput>
                            {errors.capacity && (
                              <Text
                                textColor="red"
                                mt={4}
                                fontSize="sm"
                                textTransform="capitalize"
                              >
                                {errors.capacity.message as ReactNode}
                              </Text>
                            )}
                          </Stack>
                          {getValues("category") === "chalet" && (
                            <Stack direction={"row"} spacing={3}>
                              <Checkbox {...register("has_beach")}>
                                {t("pages.properties.create.has-beach")}
                              </Checkbox>

                              <Checkbox {...register("has_pool")}>
                                {t("pages.properties.create.has-pool")}
                              </Checkbox>

                              <Checkbox {...register("has_garden")}>
                                {t("pages.properties.create.has-garden")}
                              </Checkbox>
                            </Stack>
                          )}
                        </Stack>
                      </FormControl>
                    )}

                    {getValues("category") === "tent_group" && (
                      <FormControl>
                        <Stack direction="column" spacing={2}>
                          <FormLabel
                            fontSize={"1rem"}
                            textTransform={"capitalize"}
                          >
                            {t("pages.properties.create.tents")}
                          </FormLabel>
                          <Stack direction={"row"} spacing={2}>
                            <Input
                              type="number"
                              height="45px"
                              disabled
                              width={"50%"}
                              borderColor="gray.200"
                              borderWidth={1}
                              borderStyle="solid"
                              value={property?.tents_info!.length || 0}
                            />
                          </Stack>
                          <List>
                            {property?.tents_info?.map(
                              (tent: Tent, index: number) => (
                                <div
                                  className="items-center px-1 py-2 border rounded-md hover:border-main-600"
                                  key={index}
                                >
                                  <ListItem position="relative">
                                    <ListIcon as={GoDotFill} />
                                    <span className="capitalize">{`${t(
                                      "pages.properties.create.tent.code"
                                    )}: #${tent?.code} | ${t(
                                      "pages.properties.create.tent.capacity"
                                    )}: ${tent?.capacity} | ${t(
                                      "pages.properties.create.tent.price"
                                    )}: ${t("general.dinar")} ${
                                      tent?.price
                                    } |  ${t(
                                      "pages.properties.create.tent.insurance"
                                    )}: ${t("general.dinar")} ${
                                      tent?.insurance
                                    } | ${t(
                                      "pages.properties.create.tent.date"
                                    )}: ${format(
                                      new Date(tent?.available_date),
                                      "dd/MM/yyyy"
                                    )} `}</span>
                                  </ListItem>
                                </div>
                              )
                            )}
                          </List>
                        </Stack>
                      </FormControl>
                    )}

                    {property?.amenities && property?.amenities.length > 0 && (
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("pages.properties.create.amenities")}
                        </FormLabel>
                        <List>
                          {property?.amenities.map(
                            (amenity: Amenity, index: number) => (
                              <div
                                className="items-center px-1 py-2 border rounded-md"
                                key={index}
                              >
                                <ListItem
                                  position="relative"
                                  _hover={{ ">.delete-button": { opacity: 1 } }}
                                >
                                  <ListIcon as={GoDotFill} />
                                  <span className="capitalize">
                                    {amenity.name}
                                  </span>
                                  {/* TODO: handle deleting amenity */}
                                  {/* <IconButton
                                  aria-label="Delete Item"
                                  icon={<CloseIcon />}
                                  className="delete-button"
                                  size="sm"
                                  position="absolute"
                                  right="0"
                                  top="50%"
                                  transform="translateY(-50%)"
                                  scale={1}
                                  opacity={0}
                                  onClick={() => handleDeleteAmenity(index)}
                                /> */}
                                </ListItem>
                              </div>
                            )
                          )}
                        </List>
                      </FormControl>
                    )}

                    {property?.services && property?.services.length > 0 && (
                      <FormControl>
                        <FormLabel fontSize="1rem" textTransform="capitalize">
                          {t("pages.properties.create.services")}
                        </FormLabel>
                        <List>
                          {property?.services.map(
                            (service: PropertyService, index: number) => (
                              <div
                                key={index}
                                className="items-center px-1 py-2 space-y-1 border rounded-md"
                              >
                                <ListItem
                                  position="relative"
                                  _hover={{ ">.delete-button": { opacity: 1 } }}
                                >
                                  <ListIcon as={GoDotFill} />
                                  <span className="capitalize">
                                    {service.name}
                                  </span>
                                  {/* TODO: handle deleting service */}
                                  {/* <IconButton
                                  aria-label="Delete Service"
                                  icon={<CloseIcon />}
                                  className="delete-button"
                                  size="sm"
                                  position="absolute"
                                  right="0"
                                  top="50%"
                                  transform="translateY(-50%)"
                                  scale={1}
                                  opacity={0}
                                  onClick={() => handleDeleteService(index)}
                                /> */}
                                </ListItem>
                              </div>
                            )
                          )}
                        </List>
                      </FormControl>
                    )}

                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.interior-design")}
                      </FormLabel>
                      {property?.interior_design !== null && !interiorDesignDeleted && (
                        <Card size={"sm"} width={"40%"} mb={4}>
                          <CardBody position={"relative"}>
                            <IconButton
                              onClick={handleInteriorDesignImageDelete}
                              aria-label="delete-image"
                              size={"md"}
                              right={1}
                              top={2}
                              isRound
                              variant={"ghost"}
                              position={"absolute"}
                              icon={
                                <IoIosCloseCircle fill="red" stroke="black" />
                              }
                            />
                            <Image src={property?.interior_design!} borderRadius="lg" />
                          </CardBody>
                        </Card>
                      )}
                      {interiorDesignDataURL && (
                        <Card size={"sm"} width={"40%"} mb={4}>
                          <CardBody position={"relative"}>
                            <IconButton
                              onClick={() => {
                                setInteriorDesignFile(null);
                                setInteriorDesignDataURL(null);
                              }}
                              aria-label="delete-image"
                              size={"md"}
                              right={1}
                              top={2}
                              isRound
                              variant={"ghost"}
                              position={"absolute"}
                              icon={
                                <IoIosCloseCircle fill="red" stroke="black" />
                              }
                            />
                            <Image src={interiorDesignDataURL} borderRadius="lg" />
                          </CardBody>
                        </Card>
                      )}
                      <Input
                        type="file"
                        isDisabled={interiorDesignDeleted || (interiorDesignDataURL !== null)}
                        multiple
                        height="45px"
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        textTransform="capitalize"
                        pt="6px"
                        {...register("interior_design")}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.available-date")}
                      </FormLabel>
                      <Input
                        type="text"
                        height="45px"
                        isDisabled
                        value={format(
                          new Date(property?.available_date),
                          "dd/MM/yyyy"
                        )}
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        placeholder={`${t(
                          "pages.properties.create.available-date"
                        )}`}
                      />
                      {errors.available_date && (
                        <Text
                          textColor="red"
                          mt={4}
                          fontSize="sm"
                          textTransform="capitalize"
                        >
                          {errors.available_date.message as ReactNode}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="1rem" textTransform="capitalize">
                        {t("pages.properties.create.rules")}
                      </FormLabel>
                      <Textarea
                        rows={4}
                        borderColor="gray.200"
                        borderWidth={1}
                        borderStyle="solid"
                        placeholder={`${t("pages.properties.create.rules")}`}
                        textTransform="capitalize"
                        {...register("rules")}
                      />
                    </FormControl>
                  </Stack>
                </div>
                <Flex justifyContent="end" mt={6}>
                  <Button type="submit" disabled={!isFormDirty().isDirty}>
                    {t("general.send")}
                  </Button>
                </Flex>
              </>
            </form>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default EditPropertyModal;
