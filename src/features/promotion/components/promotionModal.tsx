import React, { useState } from "react";
import { Modal, Typography, Button } from "components/shared/UI";
import {
  CustomRadioGroup,
  Form,
  RadioInputVariant,
} from "components/shared/form";
import { useForm } from "react-hook-form";
import { FormInputSchema } from "../../../types";
import { useMutatePromote } from "../hooks/query/useMutatePromote";
import { useAppSelector } from "../../../hooks";
import { selectPropertyId } from "../slices/PromotionModalSlice";
import { t } from "i18next";
interface PromotionModalProps {
  showModal: boolean;
  onClose: () => void;
}

export interface AddPromoteFormData {
  promoteOption: string;
}

export interface PromotionFormSchema {
  promoteOption: FormInputSchema<"promoteOption">;
}

function PromotionModal({ showModal, onClose }: PromotionModalProps) {
  const propertyId = useAppSelector(selectPropertyId);
  const { createPromote } = useMutatePromote();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPromoteFormData>();

  const addPromoteFormSchema: PromotionFormSchema = {
    promoteOption: {
      id: "promoteOption",
      register: {
        ...register("promoteOption", {
          required: "promote Option is required",
        }),
      },
      error: errors.promoteOption,
    },
  }
  // State to store the selected ad type
  const [selectedAdType, setSelectedAdType] = useState<string>('');

  const handlePromoteSubmit = () => {
    createPromote(propertyId, selectedAdType);
    setTimeout(() => {
      onClose();
    }, 1500)
  };

  const promoteOptions = [
    {
      value: "home_feature",
      label: `${t("pages.properties.promotion.ad.feature")}`,
    },
    {
      value: "search_feature",
      label: `${t("pages.properties.promotion.ad.search")}`,
    },
  ];

  return (
    <Modal
      isOpen={showModal}
      onClose={onClose}
      className="md:max-w-md"
      allowCloseBtn={false}
    >
      <div className="p-2">
        <div className="flex flex-col space-y-5">
          <Typography variant="h4" as="h4" className="text-center capitalize">
            {t("pages.properties.promotion.choose")}
          </Typography>
          {/* Radio button group to choose one option */}
          <Form className="w-full" formHandleSubmit={handleSubmit} submitHandler={handlePromoteSubmit}>
            <CustomRadioGroup
              value={selectedAdType}
              setValue={setSelectedAdType}
              radioGroupItems={promoteOptions}
              hasIndicator={true}
              label=""
              className={"flex flex-col"}
              variant={RadioInputVariant.MAIN}
              inputSchema={addPromoteFormSchema.promoteOption}
            />
          </Form>
          <Button onClick={handlePromoteSubmit}>{t("general.ok")}</Button>
        </div>
      </div>
    </Modal>
  );
}

export default PromotionModal;
