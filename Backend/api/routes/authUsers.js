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

import { getProficionais } from "../controllers/userCrontoller.js";

const router = express.Router();

router.post("/registerClient", registerClient);
router.post("/registerProficional", protectRoute("admin"), registerProficional);
router.post("/registerAdmin", protectRoute("admin"), registerAdmin);
router.post("/login", login);
router.post("/verifyUserInfo", verifyUserInfo);
router.post("/resetPassword", resetPassword);
router.post("/registerAppointments", registerAppointments);
router.get("/getAppointments", getAppointments);
router.get("/getProficionais", getProficionais);

export default router;
