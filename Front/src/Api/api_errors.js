export const api_errors = (
  error,
  defaultMensage = "Erro ao se conectar a API"
) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return defaultMensage;
};
