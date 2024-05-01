import { axiosInstance as axios } from 'services/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { GetPropertyServicesReturn } from 'features/properties/services/api/types'

const useGetPropertyServices = () => {
  const {data, isSuccess, isLoading, refetch} = useQuery<
  GetPropertyServicesReturn,
  Error
  >(
    ["propery-services"],
    async () => await axios.get("/services"),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false
    }
  )
  
  return {
    services: data?.data.data,
    isSuccess,
    isLoading,
    refetch,
    pages: data?.data.pages,
    itemsCount: data?.data.itemsCount
  }
}

export default useGetPropertyServices