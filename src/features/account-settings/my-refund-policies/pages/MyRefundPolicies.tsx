import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Button, Typography } from "components/shared/UI";
import { CloseIcon } from "@chakra-ui/icons";
import { PDFIcon } from "components/shared/icons";
import { Link, useToast, IconButton } from "@chakra-ui/react";
import UploadPolicyModal from "../components/UploadPolicyModal";
import { axiosInstance } from "services/axiosInstance";
import { useGetRefundPolicies } from "../hooks/query/useGetRefundPolicies";
import { RefundPolicy } from "../types/types";
import { t } from "i18next";

const MyRefundPolicies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: policies, isSuccess, refetch } = useGetRefundPolicies();

  const handleDeleteRefundPolicy = async (policyId: string, e: BaseSyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await axiosInstance.delete(`/refund_policy/${policyId}`);
      toast({ description: `${t("account.policy.delete-success")}` });
      refetch();
    } catch (error) {
      console.error("Error deleting policy:", error);
      toast({
        description: `${t("account.policy.delete-error")}`,
        status: "error",
      });
    }
  };

  const toast = useToast({ position: "top" });

  return (
    <>
      <div className="flex flex-col">
        <Typography variant="body-md-medium" as="h3">
          {t("account.policy.policies")}
        </Typography>
        {isSuccess && policies.length > 0 ? (
          policies.map((policy: RefundPolicy, index: number) => (
            <div key={index} className="relative">
              <Link
                display="flex"
                className="p-2 my-2 flex flex-row shadow-md w-full border border-gray-400 rounded-lg hover:border-main-600"
                alignItems="center"
                gap={2}
                href={policy.content}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => e.currentTarget.querySelector('.delete-button')?.classList.remove('invisible')}
                onMouseLeave={(e) => e.currentTarget.querySelector('.delete-button')?.classList.add('invisible')}
              >
                <PDFIcon />
                <Typography variant="body-md-medium" as="span">
                  {policy.name}
                </Typography>
                <IconButton
                  aria-label="Delete Policy"
                  icon={<CloseIcon />}
                  className="delete-button invisible mr-1"
                  size="sm"
                  right="5px"
                  position={"absolute"}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={(e: BaseSyntheticEvent) => handleDeleteRefundPolicy(policy._id, e)}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="flex my-6 justify-center">
            <Typography
              className="text-center"
              variant="body-md-medium"
              as="h3"
            >
              {t("account.policy.no-policies")}
            </Typography>
          </div>
        )}
      </div>
      <UploadPolicyModal isOpen={isOpen} onClose={() => setIsOpen(false)} refetch={refetch} />
      <div className="absolute bottom-3 w-1/2 flex justify-center mb-4">
        <Button className="w-1/3" onClick={() => setIsOpen(true)}>
          {t("account.policy.add")}
        </Button>
      </div>
    </>
  );
};

export default MyRefundPolicies;
