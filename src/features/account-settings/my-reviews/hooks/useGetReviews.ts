import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from "hooks"
import { axiosInstance as axios } from "services/axiosInstance"

export const useGetReviews = (page: number, size: number) => {
    const auth = useAppSelector(state => state.auth)
    const { data, isSuccess, isError, refetch, isLoading } = useQuery(['owner-reviews', page],
        async () => await getReviews(auth?.user._id, page, size)
    )

    return {
        data,
        isSuccess,
        isError,
        refetch,
        isLoading
    }
}

export const getReviews = async (ownerId: string, page: number, size: number) => {
    let res = await axios.get(`/owners/${ownerId}/reviews?page=${page}&size=${size}`)
    return {
        reviews: res.data?.data,
        itemsCount: res.data?.itemsCount,
        pages: res.data?.pages
    }
}