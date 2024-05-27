import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance, noAuthAxios } from "services/axiosInstance";
import cookie from "utils/cookie";

let initialState: any = {
  isLoading: false,
  user: null,
  accessToken: cookie.getCookie("accessToken") || null,
  refreshToken: cookie.getCookie("refreshToken") || null,
  errors: null
};

export const login = createAsyncThunk(
  "auth/login",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axios.post(
        "https://api.dyarko.com/login",
        {
          role: "owner",
          ...args
        }
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await noAuthAxios.post(
        "https://api.dyarko.com/users",
        {
          role: "owner",
          ...args
        }
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);


export const updateInfo = createAsyncThunk(
  "auth/updateInfo",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axiosInstance.put(
        "/users",
        args
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const updateProfileImg = createAsyncThunk(
  "auth/updateProfileImg",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axiosInstance.put(
        "/users/image",
        args
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axiosInstance.put(
        "/users/change_password",
        args
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const deleteProfileImg = createAsyncThunk(
  "auth/deleteProfileImg",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axiosInstance.delete("/users/image")
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axios.post(
        "https://api.dyarko.com/forget_password",
        args
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (_, thunkApi: any) => {
    try {
      const { data } = await axios.get(
        "https://api.dyarko.com/verify_auth",
        {
          headers: {
            "auth-token": thunkApi.getState().auth.accessToken
          }
        }
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

export const createBankAccount = createAsyncThunk(
  "auth/createBankAccount",
  async (args: Record<string, any>, thunkApi) => {
    try {
      const { data } = await axiosInstance.post(
        "/bookeey/merchant_registration",
        args
      )
      return thunkApi.fulfillWithValue(data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data)
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      cookie.eraseCookie("accessToken");
      cookie.eraseCookie("refreshToken");
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.errors = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data;
        state.errors = null;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        cookie.setCookie("accessToken", payload.accessToken, 7);
        cookie.setCookie("refreshToken", payload.refreshToken, 7);
      })
      .addCase(login.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        cookie.eraseCookie("accessToken");
        cookie.eraseCookie("refreshToken");
        state.errors = payload.errors;
      })

      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(register.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(createBankAccount.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(createBankAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(createBankAccount.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(updateInfo.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(updateInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.name = payload.data?.name;
        state.user.phone = payload.data?.phone;
        state.user.civilian_id = payload.data?.civilian_id;
        state.errors = null;
      })
      .addCase(updateInfo.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(updateProfileImg.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(updateProfileImg.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(updateProfileImg.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(deleteProfileImg.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(deleteProfileImg.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(deleteProfileImg.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(forgetPassword.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(changePassword.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })
      .addCase(verify.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null
      })
      .addCase(verify.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data;
        state.errors = null;
      })
      .addCase(verify.rejected, (state, { payload }: Record<string, any>) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        cookie.eraseCookie("accessToken");
        cookie.eraseCookie("refreshToken");
        state.errors = payload.errors;
      })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;