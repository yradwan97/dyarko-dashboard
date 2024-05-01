import { axiosInstance as axios } from 'services/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { GetPropertyAmenitiesReturn } from 'features/properties/services/api/types'

const useGetPropertyAmenities = () => {
  const {data, isSuccess, isLoading, refetch} = useQuery<
  GetPropertyAmenitiesReturn,
  Error
  >(
    ["propery-amenities"],
    async () => await axios.get("/amenities"),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false
    }
  )
  return {
    amenities: data?.data.data,
    isSuccess,
    isLoading,
    refetch,
    pages: data?.data.pages,
    itemsCount: data?.data.itemsCount
  }
}

export default useGetPropertyAmenities