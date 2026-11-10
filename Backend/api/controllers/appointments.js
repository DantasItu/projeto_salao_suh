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

//busca os Appointments
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

// Apagar um agendamento
export const deleteAppointments = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "selecione um Agendamento" });
    }
    // Buscar um agendamento
    const agendamento = Appointments.findById(id);

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não localizado" });
    }
    await Appointments.findByIdAndDelete(id);

    return res.status(200).json({ message: "Agendamento apagado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "erro ao apagar o Serviço", err: err.message });
  }
};
