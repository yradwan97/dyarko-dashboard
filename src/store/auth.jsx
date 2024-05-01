import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { cookie as cookieClient } from "services";
import { authAPI } from "services/api";
import { usersMapper } from "features/users";

const statusEnum = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  LOGGED_IN: "loggedIn",
  NOT_LOGGED_IN: "notLoggedIn",
  LOGGED_OUT: "loggedOut",
  SINGED_UP: "singedUp",
  ERROR: "error",
});

const userTypesEnum = Object.freeze({
  USER: "user",
  OWNER: "owner",
});

const userGroupsEnum = Object.freeze({
  OWNER: "owner",
  AGENT: "agent",
  BROKER: "broker",
  DEVELOPER: "developer",
});

const initialState = {
  user: null,
  successMessage: null,
  status: statusEnum.IDLE,
  errors: null,
  accessToken: null,
};

const signup = createAsyncThunk(
  "auth/signup",
  async ({ newUser, reset }, { rejectWithValue }) => {
    try {
      const res = await authAPI.signup(newUser);
      reset();
      return res.message;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response.data.errors);
    }
  }
);

const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = cookieClient.getCookie("accessToken") || null;
      const user = await authAPI.verifyAuth();
      user.accessToken = accessToken;
      return user;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response.data.errors);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(userData);
      const user = res.data;
      const userType = user.role;
      if (userType !== userTypesEnum.OWNER)
        return rejectWithValue([{ msg: "Wrong email or password" }]);
      cookieClient.setCookie("accessToken", res.accessToken, 3);
      cookieClient.setCookie("owner_refresh_token", res.refreshToken, 3);
      return res;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response.data.errors);
    }
  }
);

const logout = createAsyncThunk("auth/logout", async () => {
  const refreshToken = cookieClient.getCookie("owner_refresh_token");
  await authAPI.logout(refreshToken);
  cookieClient.eraseCookie("accessToken");
  cookieClient.eraseCookie("owner_refresh_token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset(state) {
      for (let key in state) {
        state[key] = initialState[key];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.status = statusEnum.LOGGED_OUT;
        state.successMessage = null;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.status = statusEnum.NOT_LOGGED_IN;
        state.errors = null;
        state.user = null;
      })
      .addCase(verifyAuth.fulfilled, (state, { payload }) => {
        const user = usersMapper.toUser(payload.data);
        state.status = statusEnum.LOGGED_IN;
        state.errors = null;
        state.user = user;
        state.accessToken = payload.accessToken;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.status = statusEnum.SINGED_UP;
        state.errors = null;
        state.user = null;
        state.successMessage = payload;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const user = usersMapper.toUser(payload.data);
        state.status = statusEnum.LOGGED_IN;
        state.errors = null;
        state.user = user;
        state.accessToken = payload.accessToken;
      })
      .addMatcher(
        isAnyOf(
          signup.pending,
          login.pending,
          logout.pending,
          verifyAuth.pending
        ),
        (state) => {
          state.status = statusEnum.LOADING;
          state.errors = null;
        }
      )
      .addMatcher(
        isAnyOf(signup.rejected, login.rejected, logout.rejected),
        (state, { payload }) => {
          state.status = statusEnum.ERROR;
          state.errors = payload;
        }
      );
  },
});

export default authSlice;

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectErrors = (state) => state.auth.errors;
export const selectSuccessMessage = (state) => state.auth.successMessage;
export const selectAuthStatusEnum = () => statusEnum;
export const selectUserTypesEnum = () => userTypesEnum;
export const selectUserGroupsEnum = () => userGroupsEnum;

export { signup, login, logout, verifyAuth };
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
