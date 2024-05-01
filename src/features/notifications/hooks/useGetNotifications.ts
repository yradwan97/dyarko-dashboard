import { useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "hooks"
import { axiosInstance } from "services/axiosInstance"
import { setNotitifications } from "store/notifications/notificationsSlice"

export const useGetNotifications = (page: number, size: number = 10) => {
    const dispatch = useAppDispatch()
    const {data, isSuccess, isLoading, refetch, isRefetching} = useQuery(
        ["notifications", page, size],
        async () => await axiosInstance.get(`/notifications?page=${page}&size=${size}&sort=is_read`).then(res => {
            dispatch(setNotitifications(res?.data))
            return res
        }),
        {
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    )
    
    return {
        notifications: data?.data.data,
        itemsCount: data?.data.itemsCount,
        pages: data?.data.pages,
        unreadCount: data?.data.unreadCount,
        isSuccess,
        isLoading,
        refetch,
        isRefetching
    }
}