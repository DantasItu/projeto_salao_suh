import User from "../models/UserClient.js";

export const getProficionais = async (req, res) => {
  try {
    const profissionais = await User.find({ type: "profissional" }).select(
      "_id name role email phone img",
    );
    res.status(200).json(profissionais);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar profissionais", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ type: "cliente" }).select("_id name type");
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: err.message });
  }
};
