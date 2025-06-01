import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

export const getUserType = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const { type } = jwtDecode(token);
    return type;
  } catch {
    return null;
  }
};

export const getUserID = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const { _id } = jwtDecode(token);
    return _id;
  } catch {
    return null;
  }
};

export const getUserName = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const { name } = jwtDecode(token);
    return name;
  } catch {
    return null;
  }
};
