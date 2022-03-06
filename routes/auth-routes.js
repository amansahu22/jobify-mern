import express from "express";
const router = express.Router();

import { Register, Login, updateUser } from '../controllers/authController.js'

router.post('/register', Register);

router.post('/login', Login);

router.patch('/update-user', updateUser)

export default router;