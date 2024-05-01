import { useQuery } from '@tanstack/react-query'
import { GetRefundResponse } from '../types/types'
import { noAuthAxios } from 'services/axiosInstance'

export const useGetRefundPolicy = () => {
    const {data, isSuccess, refetch} = useQuery<
    GetRefundResponse,
    Error
    >(
        ['terms-conditions'],
        async () => noAuthAxios.get("/settings/refund_policy").then(res => res.data),
        {
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    )

    return {
        policies: data?.data,
        isSuccess,
        refetch
    }
}