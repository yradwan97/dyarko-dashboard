import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as FiIcons from "react-icons/fi";
import { Typography } from "components/shared/UI";
import { ButtonVariant } from "components/shared/UI/buttons";
import { axiosInstance, noAuthAxios } from "services/axiosInstance";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import PasswordChangedSuccessfully from "./components/PasswordChangedSuccessfully";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "hooks";
import { ROUTES } from "configs/routes";
import signupArt from "assets/images/signup-art.jpg";
import PoweredBy from "components/shared/PoweredBy";
import { t } from "i18next";

const ResetPassword = () => {
  const navigate = useNavigate();
  const prettifyError = (error: string) => {
    let newError = error.replace(".", ": ").replaceAll("_", " ");
    return `${newError[0].toUpperCase()}${newError.substring(1)}`;
  };
  const toast = useToast({ position: "top" });
  let { tempToken } = useParams();
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = async (data: any, e: any) => {
    e.preventDefault()
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }

    let { newPassword } = data;
    try {
      const body = {
        password: newPassword,
      };
      try {
        let response = await noAuthAxios.put(
          `/reset_password/${tempToken}`,
          body
        );
        if (response.status === 200) {
          setVisible(true)
        }
      } catch (e: any) {
        console.error(e);
        // toast({ description: prettifyError(e?.response.data.errors[0].msg) });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({description: "Something went wrong", status: "error"})
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm();

  return (
    <section className="flex flex-col lg:flex-row">
      <section className="flex-1">
        <Navbar />
        <div className="container flex max-w-xl flex-col space-y-10 py-10 px-14">
          <section className="text-center lg:text-start">
            <Typography
              variant="h3"
              as="h3"
              className="mb-3 text-black capitalize"
            >
              {t("auth.reset-password.reset")}
            </Typography>
          </section>
          <PasswordChangedSuccessfully
            visible={visible}
            setVisible={setVisible}
          />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel color="black" textTransform="capitalize" mb={2}>
                  {t("auth.reset-password.new")}
                </FormLabel>
                <Flex position="relative">
                  <Input
                    {...register("newPassword", {required: `${t("general.validation.password")}`, minLength: {value: 6, message: `${t("general.validation.value.password")}`}})}
                    type={showPassword ? "text" : "password"}
                    placeholder={`${t("general.enter")} ${t("auth.reset-password.new")}`}
                  />
                  <Button
                    type="button"
                    size="sm"
                    bg="none"
                    position="absolute"
                    right={2}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    onClick={() => setShowPassword(!showPassword)}
                    zIndex="12"
                  >
                    {showPassword ? (
                      <FiIcons.FiEyeOff size={20} />
                    ) : (
                      <FiIcons.FiEye size={20} />
                    )}
                  </Button>
                </Flex>
                {errors.newPassword && (
                  <Text fontSize="14px" color="red" mt={2}>
                    {/* @ts-ignore */}
                    {errors.newPassword.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel color="black" textTransform="capitalize" mb={2}>
                  {t("general.confirm")} {t("auth.reset-password.new")}
                </FormLabel>
                <Flex position="relative">
                  <Input
                    {...register("confirmPassword", {required: `${t("general.validation.password")}`, minLength: {value: 6, message: `${t("general.validation.value.password")}`}})}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={`${t("general.confirm")} ${t("auth.reset-password.new")}}`}
                  />
                  <Button
                    type="button"
                    size="sm"
                    bg="none"
                    position="absolute"
                    right={2}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    zIndex="12"
                  >
                    {showConfirmPassword ? (
                      <FiIcons.FiEyeOff size={20} />
                    ) : (
                      <FiIcons.FiEye size={20} />
                    )}
                  </Button>
                </Flex>
                {errors.confirmPassword && (
                  <Text fontSize="14px" color="red" mt={2}>
                    {/* @ts-ignore */}
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </FormControl>
              <Stack>
                <Button
                  type="submit"
                  borderRadius=".5rem"
                  height="45px"
                  fontSize="1rem"
                  bg="main.600"
                  color="white"
                  textTransform="capitalize"
                  fontWeight="bold"
                  // _hover={{
                  //   color: "main.600",
                  //   bg: "white",
                  //   border: "solid",
                  //   borderWidth: 0.5,
                  //   borderColor: "main.600",
                  // }}
                >
                  {t("general.save")} {t("general.password")}
                </Button>
              </Stack>
            </Stack>
          </form>
        </div>
      </section>
      <PoweredBy img={signupArt} />
    </section>
  );
};

export default ResetPassword;
