import express from "express";
import { login } from "../controllers/login.js";
import {
  registerClient,
  registerProficional,
  registerAdmin,
} from "../controllers/registerUsers.js";
import { verifyUserInfo } from "../controllers/verifyUserInfo.js";
import { resetPassword } from "../controllers/resetPassword.js";
import protectRoute from "../middlewares/protectRoute.js";
import {
  registerAppointments,
  getAppointments,
} from "../controllers/appointments.js";
import { getProficionais, getUsers } from "../controllers/userCrontoller.js";
import {
  creatServices,
  getServices,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

// Funções de postagem
router.post("/registerClient", registerClient);
router.post("/login", login);
router.post("/verifyUserInfo", verifyUserInfo);
router.post("/resetPassword", resetPassword);
router.post("/registerAppointments", registerAppointments);

// Funções de chamadas
router.get("/getAppointments", getAppointments);
router.get("/getProficionais", getProficionais);
router.get("/getServices", getServices);
router.get("/getUsers", getUsers);

// Funções somentes para o Admin
router.post("/registerAdmin", protectRoute("admin"), registerAdmin);
router.post("/creatServices", protectRoute("admin"), creatServices);
router.post("/registerProficional", protectRoute("admin"), registerProficional);
router.delete("/deleteService", protectRoute("admin"), deleteService);

export default router;
