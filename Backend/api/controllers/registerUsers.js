import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserClient.js";

// Função para registrar um novo cliente.
export const registerClient = async (req, res) => {
  // Desestruturação dos dados do corpo da requisição (body).
  const { name, phone, email, password } = req.body;

  try {
    // Validação: Verifica se todos os campos obrigatórios foram preenchidos.
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    // Validação: Verifica se o email já está cadastrado no banco de dados.
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Usuário já existe" });

    // Criptografa a senha antes de salvar no banco de dados para segurança.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados com a senha criptografada.
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Cria um token JWT contendo informações do usuário para autenticação.
    const token = jwt.sign(
      { _id: user._id, type: user.type, name: user.name }, // Payload do token
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Define o tempo de expiração do token (7 dias)
      }
    );
    // Retorna uma resposta de sucesso com o token gerado.
    res.status(201).json({ message: "Usuario criado com sucesso!", token });
  } catch (err) {
    // Em caso de erro no servidor, retorna uma mensagem de erro genérica.
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: err.message });
  }
};

// Função para registrar um novo profissional.
export const registerProficional = async (req, res) => {
  try {
    // Desestruturação dos dados do corpo da requisição.
    const { name, phone, email, password, role } = req.body;
    // Validação: Verifica se todos os campos obrigatórios foram preenchidos.
    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    // Verifica se o email já está cadastrado
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Usuario já existe!" });

    // Criptografa a senha.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário profissional no banco de dados.
    const user = User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
      type: "proficional", // Define o tipo de usuário como 'proficional'.
    });

    // Retorna uma resposta de sucesso. (Nota: Não gera token aqui, talvez seja intencional).
    res.status(400).json({ message: "Usuario criado com Sucesso!" }); // O status code 400 (Bad Request) parece incorreto para sucesso. Deveria ser 201 (Created).
  } catch (err) {
    // Em caso de erro no servidor, retorna uma mensagem de erro.
    res
      .status(500)
      .json({ message: "Erro ao registrar Usuario", error: err.message });
  }
};

// Função para registrar um novo administrador.
export const registerAdmin = async (req, res) => {
  try {
    // Desestruturação dos dados do corpo da requisição.
    const { name, phone, email, password, role } = req.body;
    // Validação: Verifica se todos os campos obrigatórios foram preenchidos.
    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    // Validação: Verifica se o email já está cadastrado.
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Usuario já existe!" });

    // Criptografa a senha.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário administrador no banco de dados.
    const user = User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
      type: "admin", // Define o tipo de usuário como 'admin'.
    });

    // Retorna uma resposta de sucesso. (Nota: Também usa status 400 incorretamente).
    res.status(400).json({ message: "Usuario criado com Sucesso!" });
  } catch (err) {
    // Em caso de erro no servidor, retorna uma mensagem de erro.
    res
      .status(500)
      .json({ message: "Erro ao registrar Usuario", error: err.message });
  }
};
