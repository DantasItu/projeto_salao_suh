import express from "express";
import { login } from "../controllers/login.js";
import {
  registerClient,
  registerProficional,
  registerAdmin,
} from "../controllers/registerUsers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/registerClient", registerClient);
router.post("/registerProficional", protectRoute("admin"), registerProficional);
router.post("/registerAdmin", protectRoute("admin"), registerAdmin);
router.post("/login", login);

export default router;
