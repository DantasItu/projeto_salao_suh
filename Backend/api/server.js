import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authUsers from "./routes/authUsers.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Conexão com o MongoDB
export const conectDB = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(`Error connecting to MongoDB`, err));

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.send("API está rodando...");
});

app.use("/api/users", authUsers);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Rodando na porta ${PORT}`);
});
