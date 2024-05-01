import { useQuery } from '@tanstack/react-query'
import { GetPrivacyResponse } from '../types/types'
import { noAuthAxios } from 'services/axiosInstance'

export const useGetPrivacyPolicy = () => {
    const {data, isSuccess, refetch} = useQuery<
    GetPrivacyResponse,
    Error
    >(
        ['terms-conditions'],
        async () => noAuthAxios.get("/settings/privacy_policy").then(res => res.data),
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