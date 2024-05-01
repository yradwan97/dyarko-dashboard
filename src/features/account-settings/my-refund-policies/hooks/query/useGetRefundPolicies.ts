import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from 'services/axiosInstance'

export const useGetRefundPolicies = () => {
    const {data, isSuccess, isLoading, refetch} = useQuery(['refund-policies'],
        async () => await getRefundPolicies()
    )

    return {
        data,
        isSuccess,
        refetch,
        isLoading
    }
}

export const getRefundPolicies = async () => {
    try {
    let res = await axiosInstance.get("/refund_policy")
    return res.data.data
    } catch (e) {
        console.error(e)
    }
}