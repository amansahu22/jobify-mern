import express from "express";
const router = express.Router();

//express-rate-limit to limit the amount of request by one IP address
import expressLimit from "express-rate-limit";

const apiLimiter = expressLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10, //maximum 10 req in 15 minutes
  message:
    "Too many request from this IP address, please try again later after 15 minutes",
});

import { Register, Login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middlewares/auth.js";

router.post("/register", apiLimiter, Register);

router.post("/login", apiLimiter, Login);

//login and register user is public route but we wanna project update-user router
router.patch("/update-user", authenticateUser, updateUser);

export default router;
