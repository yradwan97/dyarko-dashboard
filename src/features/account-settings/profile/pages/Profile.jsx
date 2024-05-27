import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks";
import Button from "components/shared/UI/buttons/Button";
import { Typography } from "components/shared/UI";
import { FormControl, FormLabel, Input, Stack, Flex, Text, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import CountryDropdown from "features/auth/components/CountryDropdown";
import { deleteProfileImg, updateInfo, updateProfileImg } from "features/auth/services/authSlice";
import { t } from "i18next";
import i18next from "i18next";

const Profile = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const toast = useToast({ position: "top", colorScheme: "blue" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: auth.user?.name,
      phone: auth.user?.phone,
      civilian_id: auth.user?.civilian_id,
    }
  });

  return (
    <>
      <Typography variant="h4" as="h4" className="capitalize text-black mb-6">
        {t("account.profile.personal-info")}
      </Typography>

      <div className="flex items-center my-5">
        <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-200 mr-4 rounded-full">
          <img src={auth.user?.image} className="w-[80px] h-[80px] rounded-full" alt="" />
        </div>
        <div className="flex flex-col ps-2 sm:flex-row gap-4 gap-x-4 grow">
          <Button
            type="button"
            variant="primary"
            className="relative w-full sm:w-auto"
            disabled={auth.isLoading}
          >
            {t("general.upload")}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const element = e.currentTarget.files;
                if (element && element?.length > 0) {
                  const formData = new FormData();
                  formData.set("image", element[0]);
                  dispatch(updateProfileImg(formData))
                    .then(_ => toast({ description: `${t("account.profile.picture-upload-success")}` }))
                    .catch(_ => toast({ description: `${t("account.profile.picture-upload-fail")}` }))
                }
              }}
            />
          </Button>

          <Button
            type="button"
            variant="primary-outline"
            className="capitalize w-full sm:w-auto"
            disabled={auth.isLoading}
            onClick={() => {
              dispatch(deleteProfileImg())
                .then(_ => toast({ description: `${t("account.profile.picture-delete-success")}` }))
                .catch(_ => toast({ description: `${t("account.profile.picture-delete-fail")}` }))
            }}
          >
            {t("general.remove")}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(values => {
        dispatch(updateInfo(values))
          .unwrap()
          .then(_ => toast({ description: `${t("account.profile.info-update-success")}` }))
          .catch(_ => toast({description: `${t("account.profile.info-update-fail")}`}))
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
              type="text" placeholder={`${t("account.name")}`}
              borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
              borderWidth="1px" borderStyle="solid" borderColor="gray.200"
              {...register("name", {
                required: `${t("account.profile.validation.name")}`,
                pattern: {
                  value: /^[a-zA-Z1-9]+$/,
                  message: `${t("account.profile.validation.value.name")}`,
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
              {t("general.phone")}
            </FormLabel>
            <Flex>
              <CountryDropdown
                onSelect={val => console.log(val)}
              />
              <Input
                type="tel" placeholder="+(965) 5678712"
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                borderTopEndRadius={i18next.language === "ar" && 0} borderBottomEndRadius={i18next.language === "ar" && 0}
                borderTopStartRadius={i18next.language === "en" && 0} borderBottomStartRadius={i18next.language === "en" && 0}
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
              {t("general.civilian-id")}
            </FormLabel>
            <Input
              type="text" placeholder={`${t("general.enter")} ${t("general.civilian-id")}`}
              borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
              borderWidth="1px" borderStyle="solid" borderColor="gray.200"
              {...register("civilian_id", {
                required: `${t("general.validation.civilian_id")}`,
                pattern: {
                  value: /^\d{12}$/,
                  message: `${t("general.validation.value.civilian_id")}`,
                },
              })}
            />
            {errors.civilian_id && (
              <Text fontSize="14px" color="red" mt={2}>
                {errors.civilian_id.message}
              </Text>
            )}
          </FormControl>
          <Flex direction={"row"}>
            <Button
              type="submit" variant="primary" className="me-4 h-auto"
              disabled={auth.isLoading}
            >
              {t("general.save-changes")}
            </Button>

            <Button
              variant="primary-outline" className="!px-6"
              disabled={auth.isLoading}
            >
              {t("general.cancel")}
            </Button>
          </Flex>
        </Stack>
      </form>
    </>
  );
};

export default Profile;
