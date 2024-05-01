import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "features/notifications/types/types";

interface InitialState {
  notifications: Notification[]
  unreadNotifications: number | null
  pages: number | null
  itemsCount: number | null

}
const initialState: InitialState = { 
    notifications: [],
    unreadNotifications: null,
    pages: null,
    itemsCount: null
 };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotitifications: (state, { payload }) => {
      state.notifications = payload.data.sort((a: Notification, b: Notification) => {
        // @ts-ignore
        return a.is_read - b.is_read
      }),
      state.unreadNotifications = payload.unreadCount
      state.pages = payload.pages
      state.itemsCount = payload.itemsCount
    }
  },
});

export const { setNotitifications } = notificationsSlice.actions;

export default notificationsSlice.reducer
