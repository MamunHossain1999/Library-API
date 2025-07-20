import express from 'express';
import { login, register } from './auth.controller';

import { loginValidation, registerValidation } from './auth.validation';
import validateRequest from '../../../middlewares/validateRequest';

const router = express.Router();

router.post('/register', validateRequest(registerValidation), register);
router.post('/login', validateRequest(loginValidation), login);

export const AuthRoutes = router;
