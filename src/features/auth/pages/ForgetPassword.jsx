import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks";
import { ROUTES } from "configs/routes";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import PoweredBy from "../components/PoweredBy";
import Navbar from "../components/Navbar";
import { Typography } from "components/shared/UI";

import { forgetPassword } from "../services/authSlice";

import loginPic from "assets/images/login-pic.png";
import { t } from "i18next";

const ForgetPassword = () => {
  const toast = useToast({ position: "top", duration: 3000, colorScheme: "blue" });
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (auth.accessToken) navigate(ROUTES.DASHBOARD);
  }, [auth.accessToken]);

  return (
    <div className="flex">
      <div className="flex-1">
        <Navbar />
        <div className="mx-auto w-5/6 py-16 md:w-4/6 md:py-24 lg:w-4/6">
          <Typography variant="h3" as="h3" className="mb-3 capitalize">
            {t("auth.forgot-password")}
          </Typography>
          <Typography variant="body-md-medium" as="p" className="opacity-50 mb-6 capitalize">
            {t("auth.forgot-password-description")}
          </Typography>
          {(auth.errors && Array.isArray(auth.errors)) ? (
            <Alert bg="error" color="white" mb={6} borderRadius={4}>
              <AlertIcon color="white" />
              {auth.errors.map((error, index) => (
                <p key={index}>{error?.msg || "error"}</p>
              ))}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit(values => {
            dispatch(forgetPassword(values))
              .unwrap()
              .then(res => {
                toast({ description: "please check your email" });
                navigate(ROUTES.LOGIN)
              })
              .catch(err => console.log("first"))
          })}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel
                  color="black" textTransform="capitalize" mb={2}
                >
                  {t("account.email")}
                </FormLabel>
                <Input
                  type="email" placeholder="hi@example.com"
                  borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                  borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                  {...register("email", {
                    required: `${t("general.validation.email")}`,
                    pattern: {
                      value: /^[a-zA-Z0-9_\-.]+@[a-zA-Z-.]+.[a-zA-Z-.]+$/,
                      message: `${t("general.validation.value.email")}`,
                    },
                  })}
                />
                {errors.email && (
                  <Text fontSize="14px" color="red" mt={2}>
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>

              <Button
                type="submit" borderRadius=".5rem" height="45px"
                fontSize="1rem" bg="main.600" color="white"
                textTransform="capitalize" fontWeight="bold"
                isLoading={auth.isLoading}
                _hover={{ bg: "primary.600" }}
              >
                {t("general.reset")}
              </Button>
            </Stack>
          </form>

          <Typography
            variant="body-sm-medium"
            as="p"
            className="pt-6 text-center text-gray-500"
          >
            {t("general.have-account")}&nbsp;
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-black underline decoration-1"
            >
              {t("general.login")}
            </Link>
          </Typography>
        </div>
      </div>
      <PoweredBy img={loginPic} />
    </div>
  );
}

export default ForgetPassword;
