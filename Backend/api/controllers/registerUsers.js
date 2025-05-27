import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserClient.js";

export const registerClient = async (req, res) => {
  // Desestruturação dos dados do corpo da requisição
  const { name, phone, email, password } = req.body;

  try {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    // Verifica se o email já está cadastrado
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Usuário já existe" });

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // cria o token JWT com as informações do usuário
    const token = jwt.sign(
      { id: user._id, type: user.type },
      process.env.JWT_SECRET,
      {}
    );
  } catch (err) {
    //   messagem de erro se não conseguir criar o usuário
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: err.message });
  }
};
