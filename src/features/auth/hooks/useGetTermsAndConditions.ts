import { useQuery } from '@tanstack/react-query'
import { GetTermsConditionsResponse, GetTermsConditionsReturn } from '../types/types'
import { noAuthAxios } from 'services/axiosInstance'

export const useGetTermsAndConditions = () => {
    const {data, isSuccess, refetch} = useQuery<
    GetTermsConditionsResponse,
    Error
    >(
        ['terms-conditions'],
        async () => noAuthAxios.get("/settings/terms_conditions").then(res => res.data),
        {
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    )

    return {
        terms: data?.data,
        isSuccess,
        refetch
    }
}