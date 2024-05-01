import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

import { cookie } from "services/index";
import { ROUTES } from "configs/routes";
import i18next from "i18next";

const API_URI = import.meta.env.VITE_API_URI;

const redirectToLogin = () => window.location.assign(ROUTES.LOGIN);
const checkTokenExpiration = (accessToken) => {
  const accessTokenDecoded = jwt_decode(accessToken);
  return dayjs.unix(accessTokenDecoded.exp).diff(dayjs()) < 1;
};

const noAuthAxios = axios.create({
  baseURL: API_URI,
  timeout: 5000,
});

// axios instance that intercept authentication
const axiosInstance = axios.create({
  baseURL: API_URI,
  // timeout: 50000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = cookie.getCookie("accessToken");
  const pathname = window.location.pathname;

  if (accessToken === null && ![ROUTES.LOGIN, ROUTES.SIGNUP].includes(pathname))
    return redirectToLogin();

  const isExpired = checkTokenExpiration(accessToken);
  config.headers["auth-token"] = `Bearer ${accessToken}`;
  if (i18next?.language === "ar") config.headers["Accept-Language"] = "ar"
  if (!isExpired) return config;

  const refreshToken = cookie.getCookie("owner_refresh_token");
  const response = await axios.post(`${API_URI}/refresh_token`, {
    refresh_token: refreshToken,
  });

  if (response.status === 401 || response.status === 403) {
    console.table("expired refresh token");
    return redirectToLogin();
  }
  cookie.setCookie("accessToken", response.data.accessToken);
  config.headers["auth-token"] = `Bearer ${response.data.accessToken}`;
  return config;
});

export { axiosInstance, noAuthAxios };
