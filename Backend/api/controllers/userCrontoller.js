import User from "../models/UserClient.js";

export const getProficionais = async (req, res) => {
  try {
    const profissionais = await User.find({ role: "profissional" }).select(
      "_id nome role email phone",
    );
    res.status(200).json(profissionais);
  } catch (error) {
    res
      .status(500)
      .json({ mensage: "erro ao buscar profissionais", error: error.message });
  }
};
