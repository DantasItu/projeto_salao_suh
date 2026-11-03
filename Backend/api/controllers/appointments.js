import Appointments from "../models/Appointments.js";

export const registerAppointments = async (req, res) => {
  const {
    title,
    description,
    serviceId,
    clientId,
    professionalId,
    start,
    end,
  } = req.body;

  try {
    // Verificar se todos os campos foram preenchidos
    if (
      !title ||
      !serviceId ||
      !clientId ||
      !professionalId ||
      !start ||
      !end
    ) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos obrigatórios" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Verificar se o profissional já tem um agendamento no mesmo horário
    const existeAppointment = await Appointments.findOne({
      professionalId,
      start: { $lt: endDate },
      end: { $gt: startDate },
    });
    if (existeAppointment) {
      return res.status(400).json({
        message: "Profissional já possui um agendamento nesse horário",
      });
    }
    // Criar o novo agendamento
    const newAppointment = await Appointments.create({
      title,
      description,
      serviceId,
      clientId,
      professionalId,
      start: startDate,
      end: endDate,
    });
    res.status(201).json({
      message: "Agendamento criado com sucesso",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao registrar agendamento", error: err.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.find();
    return res.status(200).json(appointments);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar agendamentos", error: err.message });
  }
};
