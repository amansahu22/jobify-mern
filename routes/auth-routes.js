import express from "express";
const router = express.Router();

import { Register, Login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middlewares/auth.js";

router.post("/register", Register);

router.post("/login", Login);

//login and register user is public route but we wanna project update-user router
router.patch("/update-user", authenticateUser, updateUser);

export default router;
