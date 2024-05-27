import React, { BaseSyntheticEvent, useState } from "react";
import { Input, Button, useToast } from "@chakra-ui/react";
import { axiosInstance } from "services/axiosInstance";
import { Modal, Typography } from "components/shared/UI"; // Import the custom Modal component
import { t } from "i18next";

interface UploadPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const UploadPolicyModal: React.FC<UploadPolicyModalProps> = ({
  isOpen,
  onClose,
  refetch,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [policyName, setPolicyName] = useState<string>("");
  const toast = useToast({ position: "top" });

  const handleFileChange = (event: BaseSyntheticEvent) => {
    console.log(event)
    setSelectedFile(event.target.files[0]);
  };

  const handlePolicyNameChange = (event: BaseSyntheticEvent) => {
    setPolicyName(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !policyName) {
      toast({
        description: `${t("account.policy.upload-file")}`,
        status: "error",
        colorScheme: "orange",
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", policyName);
    formData.append("content", selectedFile);

    try {
      await axiosInstance.post("/refund_policy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({ description: `${t("account.policy.upload-success")}` });
      onClose();
      refetch();
    } catch (error) {
      console.error("Error uploading policy:", error);
      toast({
        description: `${t("account.policy.upload-error")}`,
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} allowCloseBtn={true} widthCSSClassname="w-1/2">
      <Typography variant="body-lg-bold" as="h2" className="mt-3">
        {t('account.policy.add')}
      </Typography>
      <div className="mt-8 py-5 space-y-4">
        <Input
          type="text"
          placeholder={`${t("account.policy.policy-name")}`}
          className="border border-main-600"
          value={policyName}
          onChange={handlePolicyNameChange}
        />
        <Input
          type="file"
          accept=".pdf"
          height="45px"
          borderColor="gray.200"
          borderWidth={1}
          borderStyle="solid"
          textTransform="capitalize"
          pt="6px"
          placeholder={`${t("account.policy.choose-file")}`}
          onChange={handleFileChange}
        />
      </div>
      <Button onClick={handleUpload}>{t("account.policy.upload")}</Button>
    </Modal>
  );
};

export default UploadPolicyModal;
