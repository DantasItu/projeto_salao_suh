import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserClient.js";

export const login = async (req, res) => {
  // busca os dados preenchidos pelo usuário
  const { login, password } = req.body;

  try {
    // verificar se os campos estão preenchidos
    if (!login || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    // Verifica se o usuário existe pelo email ou nome
    const user = await User.findOne({
      $or: [{ email: login }, { name: login }],
    });
    if (!user)
      return res.status(404).json({ message: "Usuario não encontrado" });

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Senha incorreta" });

    // Gera o token JWT
    const token = jwt.sign(
      { _id: user._id, type: user.type, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // o token possui o id do usuário e o tipo de usuário (cliente, profissional ou admin)
    res.status(200).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao criar Seção", error: err.massage });
  }
};
