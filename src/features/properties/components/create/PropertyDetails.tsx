import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  getCategorySpecificClasses,
  getCategorySpecificTypes,
} from "features/properties/utils/property";
import { useAppSelector } from "hooks";
import { PropertyCategoryItem, propertyCategorysItems } from "./SelectCategory";
import { Map } from "components/shared/UI";
import { useEffect, useState } from "react";
import {
  governerates,
  Governorate,
  Region,
  regionsList,
} from "consts/locations";
import { AddIcon } from "@chakra-ui/icons";
import { useGetRefundPolicies } from "features/account-settings/my-refund-policies/hooks/query/useGetRefundPolicies";
import { RefundPolicy } from "features/account-settings/my-refund-policies/types/types";
import UploadPolicyModal from "features/account-settings/my-refund-policies/components/UploadPolicyModal";
import { t } from "i18next";
import { MdArrowDropDown } from "react-icons/md";

export interface PropertyDetailsProps {
  register: any;
  errors: any;
  getValues: any;
  setValue: any;
  isEditable: boolean
}

interface MapLatLng {
  lat: null | number;
  lng: null | number;
}

const PropertyDetails = ({
  register,
  errors,
  getValues,
  isEditable,
  setValue,
}: PropertyDetailsProps) => {
  const auth = useAppSelector((state) => state.auth);
  const [selectedLocation, setSelectedLocation] = useState<MapLatLng>();
  const [showUplaodPolicyModal, setShowUploadPolicyModal] = useState(false);
  const { data: refundPolicies, isSuccess, refetch } = useGetRefundPolicies();
  useEffect(() => {
    console.log(getValues())
  }, [getValues()]);
  const handleSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };
  useEffect(() => {
    if (selectedLocation?.lat && selectedLocation?.lng) {
      setValue("lat", selectedLocation.lat);
      setValue("long", selectedLocation.lng);
    }
  }, [selectedLocation]);

  return (
    <>
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
              disabled={isEditable}
              icon={<MdArrowDropDown style={{position: "absolute", right: 'auto', left: '0'}} />}
              textTransform="capitalize"
              right={'auto'}
              left={0}
              {...register("type", {
                required: `${t("pages.properties.create.validation.type")}`,
              })}
            >
              {getCategorySpecificTypes(getValues("category"))?.map(
                ({name, value}: any, index) => (
                  <option key={index} value={value}>
                    {t(`general.types.${value}`)}
                  </option>
                )
              )}
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
              disabled={isEditable}
              textTransform="capitalize"
              {...register("class", {
                required: `${t("pages.properties.create.validation.class")}`,
              })}
            >
              {getCategorySpecificClasses(getValues("category"))?.map(
                (propertyClass: string, index: number) => (
                  <option key={index} value={propertyClass}>
                    {t(`general.classes.${propertyClass}`)}
                  </option>
                )
              )}
            </Select>
          </FormControl>
        </SimpleGrid>

        <FormControl marginBlock={4}>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("general.auto-no")}
          </FormLabel>
          <Input
            type="number"
            height="45px"
            borderColor="gray.200"
            borderWidth={1}
            borderStyle="solid"
            placeholder={t("general.auto-no")}
            textTransform="capitalize"
            {...register("auto_no", {
              required: `${t("pages.properties.create.validation.auto-no")}`,
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
              {errors.auto_no.message}
            </Text>
          )}
        </FormControl>

        <FormControl marginBlock={4}>
          <FormLabel fontSize="1rem" textTransform="capitalize">
            {t("general.contract")}
          </FormLabel>
          <Input
            type="file"
            height="45px"
            disabled={isEditable}
            borderColor="gray.200"
            borderWidth={1}
            borderStyle="solid"
            textTransform="capitalize"
            pt="6px"
            {...register("contract", {
              required: `${t("pages.properties.create.validation.contract")}`,
            })}
          />
          {errors.contract && (
            <Text
              textColor="red"
              mt={1}
              fontSize="sm"
              textTransform="capitalize"
              fontWeight={"medium"}
            >
              {errors.contract.message}
            </Text>
          )}
        </FormControl>

        {!isEditable && (getValues("payment_type") === "rent" ||
          getValues("payment_type") === "installment") && (
          <>
            <FormControl marginBlock={4}>
              <FormLabel fontSize="1rem" textTransform="capitalize">
                {t("general.refund-policy")} *
              </FormLabel>
              <Stack direction={"row"} spacing={2}>
                <Select
                  height="45px"
                  borderColor="gray.200"
                  borderWidth={1}
                  borderStyle="solid"
                  placeholder={`${t("general.select")} ${t("general.refund-policy")}`}
                  textTransform="capitalize"
                  {...register("refund_policy", {
                    required: `${t("pages.properties.create.validation.refund-policy")}`,
                  })}
                >
                  {isSuccess &&
                    refundPolicies?.map(
                      (policy: RefundPolicy, index: number) => (
                        <option key={index} value={policy._id}>
                          {policy.name}
                        </option>
                      )
                    )}
                </Select>
                <IconButton
                  className="h-full"
                  icon={<AddIcon />}
                  aria-label="add refund policy"
                  onClick={() => setShowUploadPolicyModal(true)}
                />
              </Stack>
              {errors.refund_policy && (
                <Text
                  textColor="red"
                  mt={1}
                  fontSize="sm"
                  textTransform="capitalize"
                  fontWeight={"medium"}
                >
                  {errors.refund_policy.message}
                </Text>
              )}
            </FormControl>
          </>
        )}

        <Stack direction={"row"} spacing={2}>
          <FormControl>
            <Map
              isDraggable={!isEditable}
              widthClassname="w-4/5"
              latitude={29.2799283891296}
              longitude={47.90808142031251}
              onSelect={handleSelect}
            />
          </FormControl>
          <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} spacing={2}>
              <FormControl>
                <FormLabel fontSize="1rem" textTransform="capitalize">
                  {t("pages.properties.create.lat")}
                </FormLabel>
                <Input
                  type="string"
                  height="45px"
                  disabled
                  borderColor="gray.200"
                  borderWidth={1}
                  borderStyle="solid"
                  placeholder={`${t("pages.properties.create.lat")}`}
                  value={selectedLocation ? selectedLocation.lat : ""}
                  textTransform="capitalize"
                  {...register("lat", {
                    required: `${t("pages.properties.create.validation.lat")}`,
                  })}
                />
                {errors.lat && (
                  <Text
                    textColor="red"
                    mt={1}
                    fontSize="sm"
                    textTransform="capitalize"
                    fontWeight={"medium"}
                  >
                    {errors.lat.message}
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="1rem" textTransform="capitalize">
                {t("pages.properties.create.long")}
                </FormLabel>
                <Input
                  type="string"
                  height="45px"
                  borderColor="gray.200"
                  borderWidth={1}
                  borderStyle="solid"
                  placeholder={`${t("pages.properties.create.long")}`}
                  disabled
                  value={selectedLocation ? selectedLocation.lng : ""}
                  textTransform="capitalize"
                  {...register("long", {
                    required: `${t("pages.properties.create.validation.long")}`,
                  })}
                />
                {errors.long && (
                  <Text
                    textColor="red"
                    mt={1}
                    fontSize="sm"
                    textTransform="capitalize"
                    fontWeight={"medium"}
                  >
                    {errors.long.message}
                  </Text>
                )}
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel fontSize="1rem" textTransform="capitalize">
                {t("general.city")} *
              </FormLabel>
              <Select
                type="text"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                disabled={isEditable}
                borderStyle="solid"
                placeholder={`${t("general.city")}`}
                textTransform="capitalize"
                {...register("city", {
                  required: `${t("pages.properties.create.validation.city")}`,
                })}
              >
                {governerates.map(
                  (gov: { id: string; info: Governorate }, index: number) => (
                    <option key={index} value={gov.id}>
                      {t(`gov.name.${gov.info.value}`)}
                    </option>
                  )
                )}
              </Select>
              {errors.city && (
                <Text
                  textColor="red"
                  mt={1}
                  fontSize="sm"
                  textTransform="capitalize"
                  fontWeight={"medium"}
                >
                  {errors.city.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1rem" textTransform="capitalize">
                {t("general.region")} *
              </FormLabel>
              <Select
                type="text"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                disabled={isEditable}
                placeholder={`${t("general.region")}`}
                textTransform="capitalize"
                {...register("region", {
                  required: `${t("pages.properties.create.validation.region")}`,
                })}
              >
                {regionsList.map(
                  (region: { id: string; info: Region }, index: number) => (
                    <option key={index} value={region.id}>
                      {t(`regions.name.${region.info.value}`)}
                    </option>
                  )
                )}
              </Select>
              {errors.region && (
                <Text
                  textColor="red"
                  mt={1}
                  fontSize="sm"
                  textTransform="capitalize"
                  fontWeight={"medium"}
                >
                  {errors.region.message}
                </Text>
              )}
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
              placeholder={t("general.replace-category")}
              borderWidth={1}
              borderStyle="solid"
              textTransform="capitalize"
              {...register("replace_with", {
                required: `${t("pages.properties.create.validation.replace")}`,
              })}
            >
              {propertyCategorysItems?.map(
                (propertyCategory: PropertyCategoryItem, index: number) => (
                  <option key={index} value={propertyCategory.propertyCategory}>
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
                {errors.replace_with.message}
              </Text>
            )}
          </FormControl>
        )}

        {(auth?.user.role === "agent" || auth?.user.role === "broker") && (
          <FormControl>
            <FormLabel fontSize="1rem" textTransform="capitalize">
              {t("general.commission")} *
            </FormLabel>
            <Input
              type="number"
              height="45px"
              min={0.1}
              borderColor="gray.200"
              borderWidth={1}
              borderStyle="solid"
              placeholder={`${t("general.commission")}`}
              textTransform="capitalize"
              {...register("commission", {
                required: `${t("pages.properties.create.validation.commission")}`,
              })}
            />
            {errors.commission && (
              <Text
                textColor="red"
                mt={1}
                fontSize="sm"
                textTransform="capitalize" 
                fontWeight={"medium"}
              >
                {errors.commission.message}
              </Text>
            )}
          </FormControl>
        )}
      </div>
      <UploadPolicyModal
        isOpen={showUplaodPolicyModal}
        onClose={() => setShowUploadPolicyModal(false)}
        refetch={refetch}
      />
    </>
  );
};

export default PropertyDetails;
