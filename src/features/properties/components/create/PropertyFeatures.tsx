import React, { Fragment, useRef, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  IconButton,
  List,
  ListItem,
  ListIcon,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { GoDotFill } from "react-icons/go";
import { Id as ToastifyId } from "react-toastify";
import useGetPropertyServices from "features/properties/hooks/query/useGetPropertyServices";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import useGetPropertyAmenities from "features/properties/hooks/query/useGetPropertyAmenities";
import { Modal, Typography } from "components/shared/UI";
import Button, { ButtonVariant } from "components/shared/UI/buttons/Button";
import { axiosInstance } from "services/axiosInstance";
import { toastifyClient } from "services/toastifyClient";
import { format } from "date-fns";
import { t } from "i18next";


export interface PropertyFeaturesProps {
  register: any;
  errors: any;
  getValues: any;
  setValue: any;
}

interface DisplayService {
  value: string;
  label: string;
}

interface DisplayAmenity {
  value: string;
  label: string;
}

interface NewService {
  name: string;
  price: string | number;
}

interface Tent {
  code: number | string;
  capacity: number | string;
  insurance: number | string;
  price: number | string;
  available_date: string;
}

const PropertyFeatures = ({
  register,
  errors,
  getValues,
  setValue,
}: PropertyFeaturesProps) => {
  const toast = useToast({ position: "top" });
  const [amenities, setAmenities] = useState<DisplayAmenity[] | undefined>([]);
  const [services, setServices] = useState<DisplayService[] | undefined>([]);
  const [showCreateServiceModal, setShowCreateServiceModal] = useState(false);
  const [showCreateAmenityModal, setShowCreateAmenityModal] = useState(false);
  const [showAddTentModal, setShowAddTentModal] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");
  const [newService, setNewService] = useState<NewService>({
    name: "",
    price: "",
  });
  const [newTent, setNewTent] = useState<Tent>();
  const [tents, setTents] = useState<Tent[] | []>([]);
  const toastId = useRef<ToastifyId | null>(null);

  const {
    services: serverServices,
    isLoading: isServicesLoading,
    refetch: refetchServices,
  } = useGetPropertyServices();
  const {
    amenities: serverAmenities,
    isLoading: isAmenitiesLoading,
    refetch: refetchAmenities,
  } = useGetPropertyAmenities();

  const serviceOptions: DisplayService[] =
    serverServices?.map((service: any) => ({
      label: `${service.name} - ${t("general.dinar")} ${service.price}`,
      value: service._id,
    })) || [];

  const amenitiesOptions: DisplayAmenity[] =
    serverAmenities?.map((service: any) => ({
      label: service.name,
      value: service._id,
    })) || [];

  const handleAddService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService: DisplayService | undefined = serviceOptions.find(
      (service) => service.value === e.target.value
    );
    if (selectedService && !services!.find((s) => s.value === e.target.value)) {
      //@ts-ignore
      setServices([...services, selectedService]);
    }
    setValue("service", null);
  };

  const handleAddAmenity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAmenity: DisplayAmenity | undefined = amenitiesOptions.find(
      (amenity) => amenity.value === e.target.value
    );
    if (
      selectedAmenity &&
      !amenities!.find((a) => a.value === e.target.value)
    ) {
      //@ts-ignore
      setAmenities([...amenities, selectedAmenity]);
    }
    setValue("amenity", null);
  };

  const handleAddTent = () => {
    if (
      !newTent!.price ||
      !newTent!.code ||
      !newTent!.capacity ||
      !newTent!.insurance ||
      !newTent!.available_date
    ) {
      toast({
        description: `${t("pages.properties.create.validation.tent-details")}`,
        colorScheme: "orange",
        status: "warning",
      });
      return;
    }
    const duplicateTent = tents.find(
      (tent: Tent) => tent.code === newTent!.code
    );
    if (duplicateTent) {
      toast({
        description: `${t(
          "pages.properties.create.validation.duplicate-tent"
        )}`,
        colorScheme: "orange",
        status: "warning",
      });
      return;
    }
    // @ts-ignore
    setTents([...tents, newTent]);
    handleModalClose();
  };

  const handleDeleteService = (index: number) => {
    //@ts-ignore
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleDeleteAmenity = (index: number) => {
    //@ts-ignore
    const updatedAmenities = [...amenities];
    updatedAmenities.splice(index, 1);
    setAmenities(updatedAmenities);
  };

  const handleDeleteTent = (index: number) => {
    //@ts-ignore
    const updatedTents = [...tents];
    updatedTents.splice(index, 1);
    setTents(updatedTents);
  };

  const handleCreateService = async () => {
    const servicesBody = {
      name: newService.name,
      price: newService.price,
    };
    try {
      let res = await axiosInstance.post("/services", servicesBody);
      if (res.data.success) {
        setNewService({ name: "", price: "" });
        refetchServices();
        toastId.current &&
          toastifyClient.success({
            id: toastId.current,
            message: `${t("pages.properties.create.new-service.success")}`,
          });
      }
    } catch (e) {
      toastId.current &&
        toastifyClient.error({
          id: toastId.current,
          message: `${t("pages.properties.create.new-service.error")}`,
        });
    }
    setShowCreateServiceModal(false);
  };

  const handleCreateAmenity = async () => {
    const amenitiesBody = {
      name: newAmenity,
      access_type: "private",
    };
    try {
      let res = await axiosInstance.post("/amenities", amenitiesBody);
      if (res.data.success) {
        setNewAmenity("");
        refetchAmenities();
        toastId.current &&
          toastifyClient.success({
            id: toastId.current,
            message: `${t("pages.properties.create.new-amenity.success")}`,
          });
      }
    } catch (e) {
      toastId.current &&
        toastifyClient.error({
          id: toastId.current,
          message: `${t("pages.properties.create.new-amenity.error")}`,
        });
    }
    setShowCreateAmenityModal(false);
  };

  const handleModalClose = () => {
    if (showCreateAmenityModal) {
      setNewAmenity("");
      setShowCreateAmenityModal(false);
    } else if (showAddTentModal) {
      setNewTent({
        code: "",
        insurance: "",
        price: "",
        capacity: "",
        available_date: "",
      });
      setShowAddTentModal(false);
    } else {
      setNewService({ name: "", price: "" });
      setShowCreateServiceModal(false);
    }
  };

  useEffect(() => {
    setValue(
      "amenities",
      [...amenities].map((a) => a.value)
    );
  }, [amenities]);

  useEffect(() => {
    setValue(
      "tents_info",
      JSON.stringify(
        [...tents].map((tent) => {
          return { ...tent, code: `Code#${tent.code}` };
        })
      )
    );
  }, [tents]);

  useEffect(() => {
    setValue(
      "services",
      [...services].map((s) => s.value)
    );
  }, [services]);

  return (
    <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("pages.properties.create.main-image")}
          </FormLabel>
          <Input
            type="file"
            height="45px"
            borderColor="gray.200"
            borderWidth={1}
            borderStyle="solid"
            textTransform="capitalize"
            pt="6px"
            {...register("image")}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("pages.properties.create.images")}
          </FormLabel>
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
              required: `${t("pages.properties.create.validation.title")}`,
            })}
          />
          {errors.title && (
            <Text
              textColor="red"
              mt={4}
              fontSize="sm"
              textTransform="capitalize"
            >
              {errors.title.message}
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
            placeholder={`${t("pages.properties.create.description")}`}
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
              {errors.description.message}
            </Text>
          )}
        </FormControl>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} marginBlock={4}>
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
              required: `${t("pages.properties.create.validation.area")}`,
            })}
          />
          {errors.area && (
            <Text
              textColor="red"
              mt={4}
              fontSize="sm"
              textTransform="capitalize"
            >
              {errors.area.message}
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
              <Input
                type="number"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                placeholder={`${t("pages.properties.create.bedrooms")}`}
                textTransform="capitalize"
                {...register("bedrooms", {
                  required: `${t(
                    "pages.properties.create.validation.bedrooms"
                  )}`,
                })}
              />
              {errors.bedrooms && (
                <Text
                  textColor="red"
                  mt={4}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {errors.bedrooms.message}
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
              <Input
                type="number"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                placeholder={`${t("pages.properties.create.bathrooms")}`}
                textTransform="capitalize"
                {...register("bathrooms", {
                  required: `${t(
                    "pages.properties.create.validation.bathrooms"
                  )}`,
                })}
              />
              {errors.bathrooms && (
                <Text
                  textColor="red"
                  mt={4}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {errors.bathrooms.message}
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
            <RadioGroup defaultValue="false">
              <FormControl>
                <FormLabel fontSize="1rem" textTransform="capitalize">
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
                {t("pages.properties.create.finish-types.super-lux")}
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
                {errors.finish_type.message}
              </Text>
            )}
          </FormControl>
        )}

        {(getValues("category") === "chalet" ||
          getValues("category") === "tent_group") && (
          <FormControl>
            <Stack direction={"row"} spacing={20}>
              <Stack direction={"column"} spacing={1}>
                <FormLabel fontSize="1rem" textTransform="capitalize">
                  {t("pages.properties.create.capacity")} *
                </FormLabel>
                <Input
                  type="number"
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
              <FormLabel fontSize={"1rem"} textTransform={"capitalize"}>
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
                  value={tents.length}
                />
                <IconButton
                  aria-label="Add Tent"
                  className="h-full"
                  icon={<AddIcon />}
                  onClick={() => setShowAddTentModal(true)}
                />
              </Stack>
              <List>
                {tents?.map((tent: Tent, index: number) => (
                  <div
                    className="items-center px-1 py-2 border rounded-md hover:border-main-600"
                    key={index}
                  >
                    <ListItem
                      position="relative"
                      _hover={{ ">.delete-button": { opacity: 1 } }}
                    >
                      <ListIcon as={GoDotFill} />
                      <span className="capitalize">{`${t(
                        "pages.properties.create.tent.code"
                      )}: #${tent?.code} | ${t(
                        "pages.properties.create.tent.capacity"
                      )}: ${tent?.capacity} | ${t(
                        "pages.properties.create.tent.price"
                      )}: ${t("general.dinar")} ${tent?.price} |  ${t(
                        "pages.properties.create.tent.insurance"
                      )}: ${t("general.dinar")} ${tent?.insurance} | ${t(
                        "pages.properties.create.tent.date"
                      )}: ${format(
                        new Date(tent?.available_date),
                        "dd/MM/yyyy"
                      )} `}</span>
                      <IconButton
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
                        onClick={() => handleDeleteTent(index)}
                      />
                    </ListItem>
                  </div>
                ))}
              </List>
            </Stack>
          </FormControl>
        )}

        <FormControl>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("pages.properties.create.amenities")}
          </FormLabel>
          <Stack direction={"row"} spacing={2}>
            <Select
              height="45px"
              borderColor="gray.200"
              disabled={isAmenitiesLoading}
              borderWidth={1}
              borderStyle="solid"
              textTransform="capitalize"
              placeholder={`${t("pages.properties.create.select-amenities")}`}
              {...register("amenity")}
              onChange={(e) => handleAddAmenity(e)}
            >
              {amenitiesOptions.map((option, index) => (
                <Fragment key={index}>
                  {amenities?.find((a) => a.value === option.value) ===
                    undefined && (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  )}
                </Fragment>
              ))}
            </Select>
            <IconButton
              aria-label="Create amenity"
              className="h-full"
              icon={<AddIcon />}
              onClick={() => setShowCreateAmenityModal(true)}
            />
          </Stack>
        </FormControl>

        {amenities && amenities.length > 0 && (
          <FormControl>
            <List>
              {amenities.map((amenity: DisplayAmenity, index: number) => (
                <div
                  className="items-center px-1 py-2 border rounded-md hover:border-main-600"
                  key={index}
                >
                  <ListItem
                    position="relative"
                    _hover={{ ">.delete-button": { opacity: 1 } }}
                  >
                    <ListIcon as={GoDotFill} />
                    <span className="capitalize">{amenity.label}</span>
                    <IconButton
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
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </FormControl>
        )}

        <FormControl>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("pages.properties.create.services")}
          </FormLabel>
          <Stack direction={"row"} spacing={2}>
            <Select
              height="45px"
              disabled={isServicesLoading}
              borderColor="gray.200"
              borderWidth={1}
              borderStyle="solid"
              
              textTransform="capitalize"
              placeholder={`${t("pages.properties.create.select-services")}`}
              {...register("service")}
              onChange={(e) => handleAddService(e)}
            >
              {serviceOptions.map((option, index) => (
                <Fragment key={index}>
                  {services?.find(
                    (service) => service.value === option.value
                  ) === undefined && (
                    <option value={option.value}>{option.label}</option>
                  )}
                </Fragment>
              ))}
            </Select>
            <IconButton
              aria-label="Create service"
              className="h-full"
              icon={<AddIcon />}
              onClick={() => setShowCreateServiceModal(true)}
            />
          </Stack>
        </FormControl>
        {services && services.length > 0 && (
          <FormControl>
            <List>
              {services.map((service: DisplayService, index: number) => (
                <div
                  key={index}
                  className="items-center px-1 py-2 space-y-1 border rounded-md hover:border-main-600"
                >
                  <ListItem
                    position="relative"
                    _hover={{ ">.delete-button": { opacity: 1 } }}
                  >
                    <ListIcon as={GoDotFill} />
                    <span className="capitalize">{service.label}</span>
                    <IconButton
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
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </FormControl>
        )}

        <FormControl>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("pages.properties.create.interior-design")}
          </FormLabel>
          <Input
            type="file"
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
            type="date"
            height="45px"
            borderColor="gray.200"
            borderWidth={1}
            borderStyle="solid"
            placeholder={`${t("pages.properties.create.available-date")}`}
            {...register("available_date", {
              required: `${t(
                "pages.properties.create.validation.available-date"
              )}`,
            })}
          />
          {errors.available_date && (
            <Text
              textColor="red"
              mt={4}
              fontSize="sm"
              textTransform="capitalize"
            >
              {errors.available_date.message}
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
      <Modal
        isOpen={showCreateAmenityModal}
        allowCloseBtn={false}
        className="!w-3/4"
        onClose={handleModalClose}
      >
        <Typography variant="body-md-medium" as="h3" className="text-center">
          {t("pages.properties.create.amenity.title")}
        </Typography>
        <div className="mt-4 space-y-4">
          <Input
            type="text"
            height="45px"
            borderColor="gray.200"
            borderWidth={1}
            borderStyle="solid"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder={`${t("pages.properties.create.amenity.name")}`}
            textTransform="capitalize"
          />
          <Stack direction={"row"} spacing={4} justifyContent={"center"}>
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={handleCreateAmenity}
              disabled={!newAmenity}
            >
              {t("general.create")}
            </Button>
            <Button
              variant={ButtonVariant.PRIMARY_OUTLINE}
              onClick={handleModalClose}
            >
              {t("general.cancel")}
            </Button>
          </Stack>
        </div>
      </Modal>
      <Modal
        isOpen={showCreateServiceModal}
        allowCloseBtn={false}
        className="!w-3/4 "
        onClose={handleModalClose}
      >
        <Typography variant="body-md-medium" as="h3" className="text-center">
          {t("pages.properties.create.service.title")}
        </Typography>
        <div className="mt-4 space-y-4">
          <Stack direction={"row"} spacing={3}>
            <Input
              type="text"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              borderStyle="solid"
              value={newService.name}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  name: e.target.value,
                })
              }
              placeholder={t("pages.properties.create.service.name")!}
              textTransform="capitalize"
            />
            <Input
              type="number"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              min={1}
              borderStyle="solid"
              value={newService.price}
              textTransform="capitalize"
              onChange={(e) =>
                setNewService({
                  ...newService,
                  price: parseInt(e.target.value),
                })
              }
              placeholder={t("pages.properties.create.service.price")!}
            />
          </Stack>
          <Stack direction={"row"} spacing={4} justifyContent={"center"}>
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={handleCreateService}
              disabled={!newService.name || !newService.price}
            >
              {t("general.create")}
            </Button>
            <Button
              variant={ButtonVariant.PRIMARY_OUTLINE}
              onClick={handleModalClose}
            >
              {t("general.cancel")}
            </Button>
          </Stack>
        </div>
      </Modal>

      <Modal
        isOpen={showAddTentModal}
        allowCloseBtn={false}
        widthCSSClassname="w-3/4 "
        onClose={handleModalClose}
      >
        <Typography variant="body-md-medium" as="h3" className="text-center">
          {t("pages.properties.create.tent.new")}
        </Typography>
        <div className="mt-4 space-y-4">
          <Stack direction={"row"} spacing={3}>
            <Input
              type="number"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              borderStyle="solid"
              value={newTent?.code}
              onChange={(e) =>
                setNewTent({
                  ...newTent!,
                  code: Number(e.target.value),
                })
              }
              placeholder={t("pages.properties.create.tent.code")!}
              textTransform="capitalize"
            />
            <Input
              type="number"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              min={1}
              borderStyle="solid"
              value={newTent?.price}
              textTransform="capitalize"
              onChange={(e) =>
                setNewTent({
                  ...newTent!,
                  price: parseInt(e.target.value),
                })
              }
              placeholder={t("pages.properties.create.tent.price")!}
            />
          </Stack>
          <Stack direction={"row"} spacing={3}>
            <Input
              type="number"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              borderStyle="solid"
              value={newTent?.insurance}
              onChange={(e) =>
                setNewTent({
                  ...newTent!,
                  insurance: Number(e.target.value),
                })
              }
              placeholder={t("pages.properties.create.tent.insurance")!}
              textTransform="capitalize"
            />
            <Input
              type="number"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              min={1}
              borderStyle="solid"
              value={newTent?.capacity}
              textTransform="capitalize"
              onChange={(e) =>
                setNewTent({
                  ...newTent!,
                  capacity: parseInt(e.target.value),
                })
              }
              placeholder={t("pages.properties.create.tent.capacity")!}
            />
          </Stack>
          <Stack direction={"row"} spacing={3}>
            <Input
              type="date"
              height="45px"
              borderColor="gray.200"
              borderWidth={1}
              borderStyle="solid"
              onChange={(e) => {
                setNewTent({
                  ...newTent!,
                  available_date: new Date(e.target.value).toISOString(),
                });
              }}
              placeholder={t("pages.properties.create.tent.date")!}
              textTransform="capitalize"
            />
          </Stack>
          <Stack direction={"row"} spacing={4} justifyContent={"center"}>
            <Button variant={ButtonVariant.PRIMARY} onClick={handleAddTent}>
              {t("general.create")}
            </Button>
            <Button
              variant={ButtonVariant.PRIMARY_OUTLINE}
              onClick={handleModalClose}
            >
              {t("general.cancel")}
            </Button>
          </Stack>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyFeatures;
