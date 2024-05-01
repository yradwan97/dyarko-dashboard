import { axiosInstance as axios } from "services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetFaq = (page: number) => {
    const {data: res, isSuccess, isLoading} = useQuery(['faq', page], 
      async() => await axios.get(`/faq?page=${page}`)
    )
  return {
    data: res?.data,
    isSuccess,
    isLoading
  }
}

export const useGetInfo = () => {
  const {data: res, isSuccess, isLoading} = useQuery(['info'], 
      async() => await axios.get(`/settings/info`)
    )
  return {
    data: res?.data.data,
    isSuccess,
    isLoading
  }
}