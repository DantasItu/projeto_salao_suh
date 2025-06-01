import axios from "axios";

const api = import.meta.env.VITE_URI_API;

export const loginApi = async (login, password) => {
  const response = await axios.post(`${api}/login`, {
    login,
    password,
  });
  return response.data; //Deve conter o token
};
