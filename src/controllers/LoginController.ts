import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/client';
import dotenv from 'dotenv-safe';

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const env = dotenv.config();
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Invalid E-mail or password' });
      }

      const userOnDB = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userOnDB) {
        res.status(400).json({ error: 'User not found' });
      }

      const correctPassword = await bcrypt.compare(
        password,
        userOnDB?.password as string,
      );

      if (correctPassword) {
        const token = jwt.sign(email, env.required.JWTSECRET, {
          expiresIn: '1d',
        });
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: 'Invalid E-mail or password' });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
}

export const loginController = new LoginController();
