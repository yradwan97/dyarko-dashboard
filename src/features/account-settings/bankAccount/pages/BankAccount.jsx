import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks";
import Button from "components/shared/UI/buttons/Button";
import { Typography } from "components/shared/UI";
import { FormControl, FormLabel, Input, Stack, Flex, Text, Alert, AlertIcon, useToast, UnorderedList, ListItem, Box } from "@chakra-ui/react";
import CountryDropdown from "features/auth/components/CountryDropdown";
import { axiosInstance } from "services/axiosInstance";
import { createBankAccount } from "features/auth/services/authSlice";
import { t } from "i18next";

const BankAccount = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const toast = useToast({ position: "top", colorScheme: "blue" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      <Typography variant="h4" as="h4" className="capitalize text-black mb-6">
        {t("account.bank.bank-account")}
      </Typography>

      {auth.user?.subMerchantId ? (
        <UnorderedList>
          {Object.keys(auth.user?.sub_merchent_data).map(obj => (
            <ListItem mb={2}>
              <Flex>
                <Box flex="1">{obj}</Box>
                <Box flex="1">{auth.user?.sub_merchent_data[obj]}</Box>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>

      ) : (
        <form onSubmit={handleSubmit(async values => {
          dispatch(createBankAccount(values))
            .unwrap()
            .then(_ => toast({ description: "bank account has added successfully" }))
            .catch(_ => toast({ colorScheme: "cyan", description: "try again" }))
        })}>
          <Stack spacing={6}>
            {(auth.errors && Array.isArray(auth.errors)) ? (
              <Alert bg="error" color="white" mb={6} borderRadius={4}>
                <AlertIcon color="white" />
                {auth.errors.map((error, index) => (
                  <p key={index}>{error?.msg || "error"}</p>
                ))}
              </Alert>
            ) : null}

            <FormControl>
              <FormLabel color="black" textTransform="capitalize" mb={2}>
                {t("account.name")}
              </FormLabel>
              <Input
                type="text" placeholder="full name"
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("name", {
                  required: `${t("account.bank.validation.name")}`,
                  pattern: {
                    value: /^[a-zA-Z1-9]+$/,
                    message: `${t("account.bank.validation.value.name")}`,
                  },
                })}
              />
              {errors.name && (
                <Text fontSize="14px" color="red" mt={2}>
                  {errors.name.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel color="black" textTransform="capitalize" mb={2}>
                {t("account.bank.account-name")}
              </FormLabel>
              <Input
                type="text" placeholder={t("account.bank.account-name")}
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("accountName", {
                  required: `${t("account.bank.validation.account-name")}`,
                  pattern: {
                    value: /^[a-zA-Z1-9]+$/,
                    message: `${t("account.bank.validation.value.account-name")}`,
                  },
                })}
              />
              {errors.accountName && (
                <Text fontSize="14px" color="red" mt={2}>
                  {errors.accountName.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel color="black" textTransform="capitalize" mb={2}>
                email
              </FormLabel>
              <Input
                type="email" placeholder="email"
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("email", {
                  required: `${t("general.validation.email")}`,
                })}
              />
              {errors.email && (
                <Text fontSize="14px" color="red" mt={2}>
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel color="black" textTransform="capitalize" mb={2}>
                phone
              </FormLabel>
              <Flex>
                <CountryDropdown
                  onSelect={val => console.log(val)}
                />
                <Input
                  type="tel" placeholder="+(965) 5678712"
                  borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                  borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                  borderTopStartRadius={0} borderBottomStartRadius={0}
                  {...register("phone", {
                    required: `${t("general.validation.phone")}`,
                    minLength: {
                      value: 8,
                      message: `${t("general.validation.value.phone")}`,
                    },
                  })}
                />
              </Flex>
              {errors.phone && (
                <Text fontSize="14px" color="red" mt={2}>
                  {errors.phone.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel color="black" textTransform="capitalize" mb={2}>
                {t("account.bank.swift")}
              </FormLabel>
              <Input
                type="text" placeholder="enter swiftcode"
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("swiftCode", {
                  required: `${t("account.bank.validation.swift")}`,
                })}
              />
              {errors.swiftCode && (
                <Text fontSize="14px" color="red" mt={2}>
                  {errors.swiftCode.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel color="black" textTransform="capitalize" mb={2}>
              {t("account.bank.iban")}
              </FormLabel>
              <Input
                type="text" placeholder="enter iban"
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("merchantIBanNo", {
                  required: `${t("account.bank.validation.iban")}`,
                })}
              />
              {errors.merchantIBanNo && (
                <Text fontSize="14px" color="red" mt={2}>
                  {errors.merchantIBanNo.message}
                </Text>
              )}
            </FormControl>

            <Flex justifyContent="flex-end">
              <Button
                type="submit" variant="primary" className="mr-4 h-auto"
                disabled={auth.isLoading}
              >
                {t("general.save-changes")}
              </Button>
            </Flex>
          </Stack>
        </form>
      )}


    </>
  );
};

export default BankAccount;