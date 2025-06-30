import axios from "axios";

const api = import.meta.env.VITE_URI_API;

export const loginApi = async (login, password) => {
  const response = await axios.post(`${api}/login`, {
    login,
    password,
  });
  return response.data; //Deve conter o token
};

export const registerClientApi = async (name, email, password, phone) => {
  await axios.post(`${api}/registerClient`, {
    name,
    email,
    password,
    phone,
  });
};

export const verifyUserInfoApi = async (email, phone) => {
  const response = await axios.post(`${api}/verifyUserInfo`, {
    email,
    phone,
  });
};

export const resetPasswordApi = async (email, phone, newPassword) => {
  const response = await axios.post(`${api}/resetPassword`, {
    email,
    phone,
    newPassword,
  });
};
