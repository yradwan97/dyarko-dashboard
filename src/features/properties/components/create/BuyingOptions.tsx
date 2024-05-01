import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PhoneInput } from "components/shared/form";
import { Property } from "features/properties";
import i18next, { t } from "i18next";
import { useEffect } from "react";
import { Nullable } from "types";

export interface BuyingOptionsProps {
  register: any;
  errors: any;
  getValues: any;
  setValue: any;
  isEditable?: boolean
  property?: Nullable<Property>
}

const BuyingOptions = ({
  register,
  errors,
  isEditable = false,
  getValues,
}: BuyingOptionsProps) => {
  const isRtl = i18next.language === "ar"
  // useEffect(() => {
  //   console.log(getValues())
  // }, [getValues()]);
  return (
    <div className="p-6 border border-gray-200 rounded-lg mt-11 text-left">
      {!isEditable && <RadioGroup defaultValue="rent">
        <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={2} mb={6}>
          <Box
            borderColor="gray.200"
            borderStyle="solid"
            borderWidth={1}
            borderRadius={4}
            paddingBlock={2}
            paddingInline={8}
          >
            <Radio
              {...register("payment_type", {
                required: `${t(
                  "pages.properties.create.validation.payment-type"
                )}`,
              })}
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
              {...register("payment_type", {
                required: `${t(
                  "pages.properties.create.validation.payment-type"
                )}`,
              })}
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
              {...register("payment_type", {
                required: `${t(
                  "pages.properties.create.validation.payment-type"
                )}`,
              })}
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
              {...register("payment_type", {
                required: `${t(
                  "pages.properties.create.validation.payment-type"
                )}`,
              })}
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
              {...register("payment_type", {
                required: `${t(
                  "pages.properties.create.validation.payment-type"
                )}`,
              })}
              value="replacement"
              color="red"
              size="lg"
            >
              {t("payment-types.replacement")}
            </Radio>
          </Box>
        </SimpleGrid>
      </RadioGroup>}

      {(!isEditable && getValues("payment_type") === "rent") && (
        <FormControl width={"100%"} py={2}>
          <RadioGroup defaultValue="false" width={"fit-content"} py={2}>
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
        {getValues("has_renter") === "true" && (
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
                      placeholder={`${t("pages.properties.create.renter-id")}`}
                      textTransform="capitalize"
                      {...register("user", {
                        required: `${t(
                          "pages.properties.create.validation.renter-id"
                        )}`,
                      })}
                    />
                    {errors.user && (
                      <Text
                        textColor="red"
                        mt={4}
                        fontSize="sm"
                        textTransform="capitalize"
                      >
                        {errors.user.message}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="1rem" textTransform="capitalize">
                      {t("pages.properties.create.rent-start-date")}
                    </FormLabel>
                    <Input
                      type="date"
                      height="45px"
                      borderColor="gray.200"
                      borderWidth={1}
                      borderStyle="solid"
                      textTransform="capitalize"
                      {...register("start_date", {
                        required: `${t(
                          "pages.properties.create.validation.rent-start-date"
                        )}`,
                      })}
                    />
                    {errors.start_date && (
                      <Text
                        textColor="red"
                        mt={4}
                        fontSize="sm"
                        textTransform="capitalize"
                      >
                        {errors.start_date.message}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="1rem" textTransform="capitalize">
                      {t("pages.properties.create.rent-end-date")}
                    </FormLabel>
                    <Input
                      type="date"
                      height="45px"
                      borderColor="gray.200"
                      borderWidth={1}
                      borderStyle="solid"
                      textTransform="capitalize"
                      {...register("end_date", {
                        required: `${t(
                          "pages.properties.create.validation.rent-end-date"
                        )}`,
                      })}
                    />
                    {errors.end_date && (
                      <Text
                        textColor="red"
                        mt={4}
                        fontSize="sm"
                        textTransform="capitalize"
                      >
                        {errors.end_date.message}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="1rem" textTransform="capitalize">
                      {t("pages.properties.create.rent-type")}
                    </FormLabel>
                    <RadioGroup defaultValue="daily">
                      <FormControl>
                        <Radio
                          {...register("rent_type")}
                          mb={4}
                          value="daily"
                          size="lg"
                          me={6}
                        >
                          {t("general.daily")}
                        </Radio>
                        <Radio
                          {...register("rent_type")}
                          mb={4}
                          value="weekly"
                          size="lg"
                          me={6}
                        >
                          {t("general.weekly")}
                        </Radio>
                        <Radio
                          {...register("rent_type")}
                          mb={4}
                          value="monthly"
                          size="lg"
                        >
                          {t("general.monthly")}
                        </Radio>
                      </FormControl>
                    </RadioGroup>
                    {errors.rent_type && (
                      <Text
                        textColor="red"
                        mt={4}
                        fontSize="sm"
                        textTransform="capitalize"
                      >
                        {errors.rent_type.message}
                      </Text>
                    )}
                  </FormControl>
                </>
        )}
      </div>
      {getValues("has_renter") === "true" && <hr className="my-5"/>}

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
                  {errors.paymentFrequency.message}
                </Text>
              )}
            </Flex>
            {getValues("is_daily") && (
              <>
                <FormControl>
                  <FormLabel fontSize="1rem" textTransform="capitalize">
                    {t("pages.properties.create.daily-price")}
                  </FormLabel>
                  <Input
                    type="number"
                    height="45px"
                    borderColor="gray.200"
                    borderWidth={1}
                    borderStyle="solid"
                    placeholder={`${t("pages.properties.create.daily-price")}`}
                    textTransform="capitalize"
                    {...register("daily_price", {
                      required: `${t(
                        "pages.properties.create.validation.daily-price"
                      )}`,
                    })}
                  />
                  {errors.daily_price && (
                    <Text
                      textColor="red"
                      mt={4}
                      fontSize="sm"
                      textTransform="capitalize"
                    >
                      {errors.daily_price.message}
                    </Text>
                  )}
                </FormControl>
              </>
            )}

            {getValues("is_weekly") && (
              <>
                <FormControl>
                  <FormLabel fontSize="1rem" textTransform="capitalize">
                    {t("pages.properties.create.weekly-price")}
                  </FormLabel>
                  <Input
                    type="number"
                    height="45px"
                    borderColor="gray.200"
                    borderWidth={1}
                    borderStyle="solid"
                    placeholder={`${t("pages.properties.create.weekly-price")}`}
                    textTransform="capitalize"
                    {...register("weekly_price", {
                      required: `${t(
                        "pages.properties.create.validation.weekly-price"
                      )}`,
                    })}
                  />
                  {errors.weekly_price && (
                    <Text
                      textColor="red"
                      mt={4}
                      fontSize="sm"
                      textTransform="capitalize"
                    >
                      {errors.weekly_price.message}
                    </Text>
                  )}
                </FormControl>
              </>
            )}

            {getValues("is_monthly") && (
              <>
                <FormControl>
                  <FormLabel fontSize="1rem" textTransform="capitalize">
                    {t("pages.properties.create.monthly-price")}
                  </FormLabel>
                  <Input
                    type="number"
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
                  {errors.monthly_price && (
                    <Text
                      textColor="red"
                      mt={4}
                      fontSize="sm"
                      textTransform="capitalize"
                    >
                      {errors.monthly_price.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="1rem" textTransform="capitalize">
                    {t("pages.properties.create.minimum-months")}
                  </FormLabel>
                  <Input
                    type="number"
                    min={0}
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
                  {errors.min_months && (
                    <Text
                      textColor="red"
                      mt={4}
                      fontSize="sm"
                      textTransform="capitalize"
                    >
                      {errors.min_months.message}
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
                {errors.owner_phone.message}
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
              <Input
                type="number"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                placeholder={t("pages.properties.create.insurance")}
                textTransform="capitalize"
                {...register("insurance", {
                  required: `${t(
                    "pages.properties.create.validation.insurance"
                  )}`,
                })}
              />
              {errors.insurance && (
                <Text
                  textColor="red"
                  mt={4}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {errors.insurance.message}
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
              <Input
                type="number"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                placeholder={t("general.price")}
                textTransform="capitalize"
                {...register("price", {
                  required: `${t("pages.properties.create.validation.price")}`,
                })}
              />
              {errors.price && (
                <Text
                  textColor="red"
                  mt={4}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {errors.price.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1rem" textTransform="capitalize">
                {t("pages.properties.create.max-installment-period")}
              </FormLabel>
              <Input
                type="number"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                placeholder={t(
                  "pages.properties.create.max-installment-period"
                )}
                textTransform="capitalize"
                {...register("max_installment_period", {
                  required: `${t(
                    "pages.properties.create.validation.max-installment-period"
                  )}`,
                })}
              />
              {errors.max_installment_period && (
                <Text
                  textColor="red"
                  mt={4}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {errors.max_installment_period.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1rem" textTransform="capitalize">
                {t("general.down-payment")}
              </FormLabel>
              <Input
                type="number"
                height="45px"
                borderColor="gray.200"
                borderWidth={1}
                borderStyle="solid"
                placeholder={t("general.down-payment")}
                textTransform="capitalize"
                {...register("down_payment", {
                  required: `${t(
                    "pages.properties.create.validation.down-payment"
                  )}`,
                })}
              />
              {errors.down_payment && (
                <Text
                  textColor="red"
                  mt={4}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {errors.down_payment.message}
                </Text>
              )}
            </FormControl>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyingOptions;