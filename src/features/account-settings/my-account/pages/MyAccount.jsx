import React from "react";
import Label from "components/shared/label/Label";
import { Button, Typography } from "components/shared/UI";
import { BiChevronRight } from "react-icons/bi";
import Toggle from "components/views/setting/components/Toggle";
import googleImg from "assets/images/google.png";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { useAppSelector } from "hooks";
import { t } from "i18next";

function MyAccount() {
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" as="h4" className="capitalize text-black mb-6">
        {t("account.my-account")}
      </Typography>
      <div className="mb-6">
        <Label htmlFor="">{t("account.email")}</Label>
        <div className="relative">
          <Input
            type="text" readOnly
            borderRadius=".5rem" w="100%" paddingBlock="1.50rem" paddingInline="1.25rem"
            borderWidth="1px" borderStyle="solid" borderColor="gray.200"
            value={auth.user.email}
          />
          <button className="absolute top-1/2 -translate-y-1/2 right-3 text-main-600 text-sm font-bold">
            {t("account.verify")}
          </button>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="">{t("general.password")}</Label>
        <div className="relative">
          <button
            className="w-full bg-main-100 rounded-lg py-3 px-6 !text-black font-medium text-left"
            onClick={() => navigate("/change-password")}
          >
            {t("account.change-password")}
          </button>
          <button className="absolute top-1/2 -translate-y-1/2 right-3 text-main-600 text-sm font-bold">
            <BiChevronRight className="text-xl text-gray-500" />
          </button>
        </div>
      </div>
      <div className="mt-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Label>{t("account.enable-2-step")}</Label>
          <Toggle />
        </div>
        <Typography variant="body-sm" as="p" className="text-main-secondary">
          {t("account.2-step-message")}
        </Typography>
      </div>
      <div className="mt-6 pb-6 border-b border-gray-200">
        <Typography variant="h5" as="h5" className="text-black mb-2">
          {t("account.linked-accounts")}
        </Typography>
        <Typography variant="body-sm" as="p" className="text-black/70 mb-6">
          {t("account.linked-accounts-message")}
        </Typography>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4">
            <img src={googleImg} className="w-8 h-8" alt="google" />
            <Typography
              variant="body-sm-medium"
              as="span"
              className="text-black"
            >
              {t("account.google-login")}
            </Typography>
          </div>
          <Button variant="primary-outline">{t("account.remove")}</Button>
        </div>
      </div>
      <div className="mt-6 pb-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <Typography variant="h5" as="h5" className="text-black mb-2">
            {t("account.delete")}
          </Typography>
          <Typography variant="body-sm" as="p" className="text-black/70">
            {t("account.delete-all-data")}
          </Typography>
        </div>
        <button className="border border-[#FCE3E3] rounded-lg text-[#F06565] py-2.5 px-4 text-sm font-bold">
          {t("account.delete")}
        </button>
      </div>
      <Button
        type="submit"
        variant="primary"
        className="text-md font-bold !py-3 !px-6 mt-6 block ml-auto"
      >
        {t("account.delete")}
      </Button>
    </div>
  );
}

export default MyAccount;
