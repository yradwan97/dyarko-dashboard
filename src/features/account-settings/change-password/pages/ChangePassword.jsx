import { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { Typography } from "components/shared/UI";
import { Link } from "react-router-dom";
import { Flex, FormControl, FormLabel, Input, Stack, Button, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks";
import { changePassword } from "features/auth/services/authSlice";
import { t } from "i18next";

function ChangePassword() {
  const toast = useToast({ position: "top" });
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <div className="bg-white py-6 px-5 w-7/12">
      <Typography variant="h4" as="h4" className="capitalize text-black mb-6">
        {t("account.change-password")}
      </Typography>
      <form className="space-y-6" onSubmit={handleSubmit(values => {
        dispatch(changePassword(values))
          .unwrap()
          .then(_ => toast({ description: "password updated successfully" }))
          .catch(_ => toast({ colorScheme: "cyan", description: "try again" }))
      })}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel
              color="black" textTransform="capitalize" mb={2}
            >
              {t("account.password.current")}
            </FormLabel>
            <Flex position="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={`${t("general.enter")} ${t("account.password.current")}`}
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("current_password", {
                  required: `${t("account.password.validation.current")}`,
                  minLength: {
                    value: 6,
                    message: `${t("account.password.validation.value.current")}`,
                  },
                })}
              />
              <Button
                type="button" size="sm" bg="none" position="absolute"
                right={2} top="50%" transform="translateY(-50%)" color="gray.400"
                onClick={() => setShowPassword(!showPassword)} zIndex="12"
              >
                {showPassword ? <FiIcons.FiEyeOff size={20} /> : <FiIcons.FiEye size={20} />}
              </Button>
            </Flex>

            {errors.current_password && (
              <Text fontSize="14px" color="red" mt={2}>
                {errors.current_password.message}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel
              color="black" textTransform="capitalize" mb={2}
            >
              {t("account.password.new")}
            </FormLabel>
            <Flex position="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={`${t("general.enter")} ${t("account.password.new")}`}
                borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
                borderWidth="1px" borderStyle="solid" borderColor="gray.200"
                {...register("new_password", {
                  required: `${t("account.password.validation.new")}`,
                  minLength: {
                    value: 6,
                    message: `${t("account.password.validation.value.new")}`,
                  },
                })}
              />
              <Button
                type="button" size="sm" bg="none" position="absolute"
                right={2} top="50%" transform="translateY(-50%)" color="gray.400"
                onClick={() => setShowPassword(!showPassword)} zIndex="12"
              >
                {showPassword ? <FiIcons.FiEyeOff size={20} /> : <FiIcons.FiEye size={20} />}
              </Button>
            </Flex>
            {errors.new_password && (
              <Text fontSize="14px" color="red" mt={2}>
                {errors.new_password.message}
              </Text>
            )}
          </FormControl>

          <div className="border-t border-gray-200 flex justify-end">
            <Button
              type="submit"
              bg="main.600" color="white"
              mt={4} isLoading={auth.isLoading}
              _hover={{ bg: "main.600" }}
            >
              {t("general.save-changes")}
            </Button>
          </div>
        </Stack>
      </form>
    </div>
  );
}

export default ChangePassword;
