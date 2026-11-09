import Services from "../models/Services.js";

export const creatServices = async (req, res) => {
  try {
    const { name, description, price, duration, profissionalId, img } =
      req.body;

    if (!name || price === undefined || !duration) {
      return res.status(400).json({
        message:
          "Preencha todos os campos obrigatórios (name, Preço e Duração).",
      });
    }

    const newService = new Services({
      name,
      description,
      price,
      duration,
      profissionalId: profissionalId || [],
      img,
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
      "name role email phone imgm",
    );
    res.status(200).json(services);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar serviços", err: err.message });
  }
};
