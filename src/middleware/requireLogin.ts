import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  const env = dotenv.config();

  if (!auth || !(auth?.split(' ')[0] === 'Bearer')) {
    return res.status(400).json({ error: 'Token not present' });
  }

  const token = auth?.split(' ')[1];
  const validToken = jwt.verify(token as string, env.required.JWTSECRET);

  if (validToken) {
    return next();
  } else {
    return res.status(400).json({ error: 'Invalid token' });
  }
}
