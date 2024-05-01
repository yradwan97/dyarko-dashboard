import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as FiIcons from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import TermsAndConditionsModal from "./components/TermsAndConditionsModal";

import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Text,
  useToast,
  Flex,
  Alert,
  AlertIcon,
  Checkbox,
  useDisclosure
} from "@chakra-ui/react";
import { Typography } from "components/shared/UI";
import Navbar from "../components/Navbar";

import { register as authRegister } from "../services/authSlice";

import signupArt from "assets/images/signup-art.jpg";
// import PoweredBy from "components/shared/PoweredBy";
import { ROUTES } from "configs/routes";
import CountryDropdown from "../components/CountryDropdown";
import i18next, { t } from "i18next";
import PrivacyPoliciesModal from "./components/PrivacyPoliciesModal";
import RefundPolicyModal from "./components/RefundPolicyModal";
import PoweredBy from "../components/PoweredBy";

const SignUp = () => {
  const {isOpen: isPrivacyOpen, onOpen: openPrivacy, onClose: closePrivacy} = useDisclosure()
  const {isOpen: isTermsOpen, onOpen: openTerms, onClose: closeTerms} = useDisclosure()
  const {isOpen: isRefundOpen, onOpen: openRefund, onClose: closeRefund} = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const toast = useToast({ position: "top", status: "success", duration: 3000, colorScheme: "blue" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState({
  termsConditions: false,
  privacyPolicy: false,
  refundPolicy: false,
});

  const allChecked = Object.values(checkedItems).every(Boolean)
  const isIndeterminate = Object.values(checkedItems).some(Boolean) && !allChecked

  const handleCheckboxChange = (name) => (e) => {
    setCheckedItems({
      ...checkedItems,
      [name]: e.target.checked,
    });
  };

  useEffect(() => {
    if (auth.accessToken) navigate(ROUTES.DASHBOARD);
  }, [auth.accessToken]);

  return (
    <section className="flex flex-col lg:flex-row">
      <section className="flex-1">
        <Navbar />
        <div className="container flex max-w-xl flex-col space-y-10 py-10 px-14">
          <section className="text-center lg:text-start">
            <Typography variant="h3" as="h3" className="mb-3 text-black capitalize">
            {t("general.welcome")}
            </Typography>
            <Typography
              variant="body-md-medium"
              as="p"
              className="text-gray-400 capitalize"
            >
              {t("general.welcome")} {t("auth.signup.enter-details")}
            </Typography>
          </section>
          {(auth.errors && Array.isArray(auth.errors)) ? (
            <Alert bg="error" color="white" borderRadius={4}>
              <AlertIcon color="white" />
              {auth.errors.map((error, index) => (
                <p key={index}>{error?.msg || "error"}</p>
              ))}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit(values => {
            dispatch(authRegister(values))
              .unwrap()
              .then(_ => {
                toast({ description: `${t("auth.signup.signup-success")}` });
                navigate(ROUTES.LOGIN)
              })
          })}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel color="black" textTransform="capitalize" mb={2}>
                  {t("account.type")}
                </FormLabel>
                <Select
                  borderRadius=".5rem" w="100%" height="50px"
                  borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                  
                  {...register("type", {
                    required: `${t("auth.signup.validation.type")}`
                  })}
                >
                  <option value="owner">{t("auth.signup.types.owner")}</option>
                  <option value="agent">{t("auth.signup.types.agent")}</option>
                  <option value="broker">{t("auth.signup.types.broker")}</option>
                  <option value="developer">{t("auth.signup.types.developer")}</option>
                </Select>
                {errors.type && (
                  <Text fontSize="14px" color="red" mt={2}>
                    {errors.type.message}
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color="black" textTransform="capitalize" mb={2}>
                  {t("account.name")}
                </FormLabel>
                <Input
                  type="text" placeholder={`${t("general.enter")} ${t("account.name")}`} textTransform={"capitalize"}
                  borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                  borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                  {...register("name", {
                    required: `${t("auth.signup.validation.name")}`,
                    pattern: {
                      value: /^[a-zA-Z1-9]+(\s+[a-zA-Z1-9]+)*$/
                      ,
                      message: `${t("auth.signup.validation.value.name")}`,
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
                  {t("general.civilian-id")}
                </FormLabel>
                <Input
                  type="number" placeholder={t("auth.signup.placeholder.civilian-id")} textTransform={"capitalize"}
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

              <FormControl>
                <FormLabel
                  color="black" textTransform="capitalize" mb={2}
                >
                  {t("general.password")}
                </FormLabel>
                <Flex position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={`${t("general.enter")} ${t("general.password")}`}
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
                    type="button" size="sm" bg="none" position="absolute"
                    className="rtl:left-2 ltr:right-2" top="50%" transform="translateY(-50%)" color="gray.400"
                    onClick={() => setShowPassword(!showPassword)} zIndex="12"
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

              <FormControl mt={2}>
                <FormLabel color="black" textTransform="capitalize" mb={2}>
                  {t("auth.signup.agree")}
                </FormLabel>
                <Checkbox
                  isChecked={allChecked}
                  mt={3}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked])}
                >
                  {t("auth.signup.agree-all")}
                </Checkbox>
                <Stack pl={6} mt={1} spacing={1}>
                  <Checkbox
                    isChecked={checkedItems.termsConditions}
                    {...register("termsConditions", { required: "Please agree here first." })}
                    onChange={(e) => handleCheckboxChange("termsConditions")}
                  >
                    {t("general.agree-to")} <Button onClick={openTerms} colorScheme='cyan' variant='ghost' size={"sm"}>
                      {t("general.terms-conditions")}
                    </Button>
                  </Checkbox>
                  {errors.termsConditions && (
                    <Text fontSize="14px" color="red" mt={2}>
                      {errors.termsConditions.message}
                    </Text>
                  )}
                  <Checkbox
                    {...register("privacyPolicy", { required: "Please agree here first." })}
                    isChecked={checkedItems.privacyPolicy}
                    onChange={(e) => handleCheckboxChange("privacyPolicy")}
                  >
                    {t("general.agree-to")} <Button onClick={openPrivacy} colorScheme='cyan' variant='ghost' size={"sm"}>
                    {t("general.privacy-policy")}
                    </Button>
                  </Checkbox>
                    {errors.privacyPolicy && (
                      <Text fontSize="14px" color="red" mt={2}>
                        {errors.privacyPolicy.message}
                      </Text>
                    )}
                  <Checkbox
                    isChecked={checkedItems.refundPolicy}
                    {...register("refundPolicy", { required: "Please agree here first." })}
                    onChange={(e) => handleCheckboxChange("refundPolicy")}
                  >
                    {t("general.agree-to")} <Button onClick={openRefund} colorScheme='cyan' variant='ghost' size={"sm"}>
                    {t("general.refund-policy")}
                    </Button>
                  </Checkbox>
                    {errors.refundPolicy && (
                      <Text fontSize="14px" color="red" mt={2}>
                        {errors.refundPolicy.message}
                      </Text>
                    )}
                </Stack>
              </FormControl>

              {/* <Link
                to={ROUTES.FORGET_PASSWORD}
                className="flex justify-end capitalize text-sm font-medium text-main-600"
              >
                {t("auth.forgot-password")}
              </Link> */}

              <Button
                type="submit" borderRadius=".5rem" height="45px"
                fontSize="1rem" bg="main.600" color="white"
                textTransform="capitalize" fontWeight="bold"
                isLoading={auth.isLoading}
                _hover={{ bg: "main.600" }}
              >
                {t("general.signup")}
              </Button>
            </Stack>
          </form>
          <Typography
            variant="body-sm-medium"
            as="p"
            className="text-center text-gray-500"
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
      </section>
      <PoweredBy img={signupArt} />
      <TermsAndConditionsModal isOpen={isTermsOpen} onClose={closeTerms} />
      <PrivacyPoliciesModal isOpen={isPrivacyOpen} onClose={closePrivacy} />
      <RefundPolicyModal isOpen={isRefundOpen} onClose={closeRefund} />
    </section>
  );
};

export default SignUp;
