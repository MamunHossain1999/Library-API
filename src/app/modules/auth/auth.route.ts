import { login, register, logout, getMe, } from './auth.controller';
import express from "express";

import { registerValidation, loginValidation } from "./auth.validation";
import validateRequest from "../../../middlewares/validateRequest";

import { googleLogin } from './google.controller';
import { authenticate } from '../../../middlewares/authenticate';


export interface DecodedUser {
  id: string;
  email: string;
  
}
const router = express.Router();

router.post("/register", validateRequest(registerValidation), register);
router.post("/login", validateRequest(loginValidation), login);
router.post("/logout",logout);
router.get("/me", authenticate, getMe);
router.post("/google-login", googleLogin);
export const AuthRoutes = router;
