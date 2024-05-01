import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/services/authSlice";

import sidebarSlice from "store/sidebar/sidebarSlice";
import usersSlice from "store/users/usersSlice";
import createPropertyModalSlice from "features/properties/slices/createPropertyModalSlice";
import { addVideoModalReducer } from "features/videos";
import { promotionModalReducer } from "../features/promotion/slices/PromotionModalSlice";
import contractsSlice from "features/contracts/store/contractsSlice";
import schedulesSlice from "features/account-settings/available-time/store/schedulesSlice";
import installmentsSlice from "features/requests/installment-requests/store/installmentsSlice";
import notificationsSlice from "./notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar: sidebarSlice,
    users: usersSlice,
    addVideoModal: addVideoModalReducer,
    createPropertyModal: createPropertyModalSlice,
    promotionModal: promotionModalReducer,
    contracts: contractsSlice,
    schedules: schedulesSlice,
    installments: installmentsSlice,
    notifications: notificationsSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
