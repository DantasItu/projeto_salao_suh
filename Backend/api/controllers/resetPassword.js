import bcrypt from "bcrypt";
import User from "../models/UserClient.js";

export const resetPassword = async (req, res) => {
  const { email, newPassword, phone } = req.body;

  try {
    if (!email || !newPassword || !phone) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const user = await User.findOne({ email, phone });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Criptografa a nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao alterar a senha" });
  }
};
