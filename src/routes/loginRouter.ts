import { Router } from 'express';
import { loginController } from '../controllers/LoginController';

export const loginRouter = Router();

loginRouter.post('/', loginController.login);
