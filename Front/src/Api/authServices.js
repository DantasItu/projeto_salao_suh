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
  return response.data; // Deve conter a resposta da API, como um status de sucesso ou erro
};

export const resetPasswordApi = async (email, phone, newPassword) => {
  await axios.post(`${api}/resetPassword`, {
    email,
    phone,
    newPassword,
  });
};

export const getAppointments = async () => {
  const response = await axios.get(`${api}/getAppointments`);
  return response.data;
};

export const registerAppointments = async (appointmentData) => {
  const response = await axios.post(
    `${api}/registerAppointments`,
    appointmentData,
  );
  return response.data;
};

export const getProficionais = async () => {
  const response = await axios.get(`${api}/getProficionais`);
  return response.data.map((professional) => ({
    ...professional,
    id: String(professional._id),
    name: professional.name ?? professional.nome,
    image: professional.image ?? professional.imagem,
    type: "professional",
  }));
};

export const getUsers = async () => {
  const response = await axios.get(`${api}/getUsers`);
  return response.data.map((user) => ({
    ...user,
    id: String(user._id),
    type: user.type ?? "client",
  }));
};

export const getServices = async () => {
  const response = await axios.get(`${api}/getServices`);
  return response.data.map((service) => {
    const professionalIds =
      service.profissionalId ?? service.professionalId ?? [];

    return {
      ...service,
      id: String(service._id),
      name: service.name ?? service.nome,
      description: service.description ?? service.descricao,
      price: service.price ?? service.preco,
      duration: service.duration ?? service.duracao,
      professionalId: (Array.isArray(professionalIds)
        ? professionalIds
        : [professionalIds]
      ).map((professional) =>
        String(professional?._id ?? professional),
      ),
      image: service.image ?? service.imagem,
      role: "services",
    };
  });
};

export const creatServices = async (serviceData) => {
  const response = await axios.post(`${api}/creatServices`, serviceData);
  return response.data;
};
