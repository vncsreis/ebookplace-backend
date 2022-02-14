import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/client';
import dotenv from 'dotenv-safe';
import { getErrorMessage } from '../utilities/getErrorMessage';

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const env = dotenv.config();
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Invalid E-mail or password' });
      }

      const userOnDB = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userOnDB) {
        return res.status(400).json({ error: 'User not found' });
      }

      const correctPassword = await bcrypt.compare(
        password,
        userOnDB?.password as string,
      );

      if (correctPassword) {
        const token = jwt.sign({ email }, env.required.JWTSECRET, {
          expiresIn: '1D',
        });
        return res
          .status(200)
          .json({
            token,
            email,
            picture: userOnDB.picture,
            id: userOnDB.id,
            name: userOnDB.name,
          });
      } else {
        return res.status(400).json({ error: 'Invalid E-mail or password' });
      }
    } catch (e) {
      return res.status(400).json({ error: getErrorMessage(e) });
    }
  }
}

export const loginController = new LoginController();
