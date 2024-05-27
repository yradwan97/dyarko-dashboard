import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "services/axiosInstance";

const REFUND_POLICY_KEY = "refund-policies";
export const useGetRefundPolicies = () => {
  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: [REFUND_POLICY_KEY],
    queryFn: async () => await getRefundPolicies(),
  });

  return {
    data,
    isSuccess,
    refetch,
    isLoading,
  };
};

export const getRefundPolicies = async () => {
  try {
    let res = await axiosInstance.get("/refund_policy");
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};
