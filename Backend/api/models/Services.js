import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, //em minutos
  //   Array de referências para os profissionais que executam ese serviço
  profissionalId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  img: { type: String },
});

export default mongoose.model("Services", serviceSchema);
