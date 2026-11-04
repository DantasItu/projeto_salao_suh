import Services from "../models/Services.js";

export const creatServices = async (req, res) => {
  try {
    const { nome, descricao, preco, duracao, profissionalId, imagem } =
      req.body;

    if (!nome || preco === undefined || !duracao) {
      return res.status(400).json({
        message:
          "Preencha todos os campos obrigatórios (Nome, Preço e Duração).",
      });
    }

    const newService = new Services({
      nome,
      descricao,
      preco,
      duracao,
      profissionalId: profissionalId || [],
      imagem,
    });

    const savedService = await newService.save();
    res
      .status(201)
      .json({ message: "Serviço criado com sucesso!", service: savedService });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao criar serviço", err: err.message });
  }
};

// Buscar todos os serviços
export const getServices = async (req, res) => {
  try {
    const services = await Services.find().populate(
      "profissionalId",
      "nome role email phone imagem",
    );
    res.status(200).json(services);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar serviços", err: err.message });
  }
};
