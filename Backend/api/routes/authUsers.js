import express from "express";
import { login } from "../controllers/login.js";
import {
  registerClient,
  registerProficional,
  registerAdmin,
} from "../controllers/registerUsers.js";

const router = express.Router();

router.post("/registerClient", registerClient);
router.post("/registerProficional", registerProficional);
router.post("/registerAdmin", registerAdmin);
router.post("/login", login);

export default router;
