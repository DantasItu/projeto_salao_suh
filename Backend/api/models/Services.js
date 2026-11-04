import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  duracao: { type: Number, required: true }, //em minutos
  //   Array de referências para os profissionais que executam ese serviço
  profissionalId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  imagem: { type: String },
});

export default mongoose.model("Services", serviceSchema);
