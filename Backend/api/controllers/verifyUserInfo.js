import User from "../models/UserClient.js";

export const verifyUserInfo = async (req, res) => {
  const { email, phone } = req.body;

  try {
    if ((!email, !phone)) {
      return res.status(400).json({ message: "preencha todos os campos" });
    }

    const user = await User.findOne({ email, phone });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json({ message: "Usuário verificado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Usuário não encontrado" });
  }
};
