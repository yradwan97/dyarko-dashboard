import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPointsQuestionMarkData, getBalanceQuestionMarkData, getWalletQuestionMarkData } from "../../balance/services/api/balanceService";

export const useGetWalletQuestionMarkInfo = (tab : string) => {
    const {data, isSuccess, isError, isLoading, error, refetch} = useQuery<
    any,
    Error
    >(
        ['question-mark', tab],
        async () => {
            if (tab === "user-wallet") {
                return getWalletQuestionMarkData()
            } else if (tab === "balance") {
                return await getBalanceQuestionMarkData()
            } else if (tab === "points") {
                return await getPointsQuestionMarkData()
            } else {
                throw new Error("invalid tab")
            }
        }
    )
    return {
        data,
        isSuccess,
        isError,
        isLoading,
        error,
        refetch
    }
}