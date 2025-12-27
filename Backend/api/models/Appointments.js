import mongoose from "mongoose";

const appointmentsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  serviceId: { type: Number, required: true },
  clientId: { type: Number, required: true },
  professionalId: { type: Number, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

export default mongoose.model("Appointment", appointmentsSchema);
