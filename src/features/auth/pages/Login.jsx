import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as FiIcons from "react-icons/fi";
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
  Flex
} from "@chakra-ui/react";
import PoweredBy from "../components/PoweredBy";
import Navbar from "../components/Navbar";
import { Typography } from "components/shared/UI";
import { login } from "../services/authSlice";
import i18next, { t } from "i18next"
import loginPic from "assets/images/login-pic.png";

const Login = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const isRtl = i18next.language === "ar"
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (auth.accessToken) navigate(ROUTES.DASHBOARD);
  }, [auth.accessToken]);

  return (
    <div className="flex">
      <div className="flex-1">
        <Navbar />
        <div className="mx-auto w-5/6 py-16 md:w-4/6 md:py-24 lg:w-4/6">
          <Typography variant="h3" as="h3" className="mb-3 capitalize">
            {t("auth.login.welcome")}
          </Typography>
          <Typography variant="body-md-medium" as="p" className="opacity-50 mb-6">
            {t("auth.login.welcome-message")}
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
            dispatch(login(values));
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

              <FormControl>
                <FormLabel
                  color="black" textTransform="capitalize" mb={2}
                >
                  {t("general.password")}
                </FormLabel>
                <Flex position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={`${t("")} ${t("general.password")}`}
                    borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                    borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                    {...register("password", {
                      required: `${t("general.validation.password")}`,
                      minLength: {
                        value: 6,
                        message: `${t("general.validation.value.password")}`,
                      },
                    })}
                  />
                  <Button
                    type="button"
                    size="sm"
                    bg="none"
                    position="absolute"
                    // right={2}
                    top="50%"
                    width={"14"}
                    transform="translateY(-50%)"
                    color="gray.400"
                    onClick={() => setShowPassword(!showPassword)}
                    zIndex="12"

                    style={{ left: isRtl ? 2 : 'auto', right: isRtl ? 'auto' : 2 }} // Adjust left/right styles based on direction
                  >
                    {showPassword ? <FiIcons.FiEyeOff size={20} /> : <FiIcons.FiEye size={20} />}
                  </Button>
                </Flex>
                {errors.password && (
                  <Text fontSize="14px" color="red" mt={2}>
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <Link
                to={ROUTES.FORGET_PASSWORD}
                className="flex justify-end text-sm font-medium text-main-600"
              >
                {t("auth.forgot-password")}
              </Link>

              <Button
                type="submit" borderRadius=".5rem" height="45px"
                fontSize="1rem" bg="main.600" color="white"
                textTransform="capitalize" fontWeight="bold"
                isLoading={auth.isLoading}
                _hover={{ bg: "primary.600" }}
              >
                {t("general.login")}
              </Button>
            </Stack>
          </form>

          <Typography
            variant="body-sm-medium"
            as="p"
            className="pt-6 text-center text-gray-500"
          >
            {t("general.no-account")}
            <Link
              to={ROUTES.SIGNUP}
              className="font-bold text-black underline decoration-1"
            >
              {t("general.free-signup")}
            </Link>
          </Typography>
        </div>
      </div>
      <PoweredBy img={loginPic} />
    </div>
  );
}

export default Login;
