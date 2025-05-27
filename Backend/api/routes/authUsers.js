import express from "express";
import { login } from "../controllers/login.js";
import { registerClient } from "../controllers/registerUsers.js";

const router = express.Router();

router.post("/registerClient", registerClient);
router.post("/login", login);

export default router;
