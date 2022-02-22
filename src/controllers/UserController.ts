import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/client';
import bcrypt from 'bcrypt';
import { UserCreateInfo, UserUpdateInfo } from '../models/UserInfoInput';
import { Request, Response } from 'express';
import { getErrorMessage } from '../utilities/getErrorMessage';

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const user: UserCreateInfo = req.body;
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(user.password, salt);

      const createdUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          ...user,
          password: hashedPassword,
          picture: files['picture'][0].filename,
        },
      });
      res.status(200).json(createdUser);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const newUser: UserUpdateInfo = req.body;
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        if (files['picture'] !== undefined) {
          newUser.picture = files['picture'][0].filename;
        }
      }

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...newUser,
        },
      });

      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const newPassword = req.body.password;

      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);

      const oldUser = await prisma.user.findUnique({ where: { id } });

      const updatedPasswordUser = await prisma.user.update({
        where: { id },
        data: {
          ...oldUser,
          password: newHashedPassword,
        },
      });

      res.status(200).json(updatedPasswordUser);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedUser = await prisma.user.delete({ where: { id } });
      return deletedUser;
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }
}

export const userController = new UserController();
