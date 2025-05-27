import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Role: {
    type: String,
    enum: ["cabeleireira", "barbeiro", "manicure", "maquiadora", "maquiador"],
    default: "",
  },
  type: {
    type: String,
    enum: ["cliente", "proficional", "admin"],
    default: "cliente",
  },
});

export default mongoose.model("User", userSchema);
