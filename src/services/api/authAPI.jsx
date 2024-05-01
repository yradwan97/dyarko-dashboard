import { axiosInstance, noAuthAxios as axios } from "services/axiosInstance";

const LOGIN_API_URI = `/login`;
const VERIFY_AUTH_API_URI = `/verify_auth`;
const SIGNUP_AUTH_API_URI = `/users`;
const LOGOUT_AUTH_API_URI = `/logout`;
const ROLE = "owner";

const login = async (user) => {
  const res = await axios.post(LOGIN_API_URI, {
    email: user.email,
    password: user.password,
    role: ROLE,
  });
  return res.data;
};

const signup = async (newUser) => {
  const res = await axios.post(SIGNUP_AUTH_API_URI, {
    civilian_id: newUser.civilianId,
    phone: newUser.phoneNumber,
    email: newUser.email,
    name: newUser.name,
    role: ROLE,
    type: newUser.type,
    password: newUser.password,
  });
  return res.data;
};

const logout = async (refreshToken) => {
  const res = await axios.post(LOGOUT_AUTH_API_URI, {
    refresh_token: refreshToken,
  });

  return res.data;
};

const verifyAuth = async () => {
  const res = await axiosInstance.get(VERIFY_AUTH_API_URI);
  return res.data;
};

export { login, signup, logout, verifyAuth };
