import express from 'express';
import { AuthController } from '../controllers/auth';

const authRouter = express.Router();

const auth = new AuthController();

authRouter.post('/login', auth.login)

export = authRouter;