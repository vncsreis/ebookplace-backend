import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/client';
import { UserInfoInput } from '../models/UserInfoInput';

class UserController {
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async createUser(user: UserInfoInput) {
    const createdUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        ...user,
      },
    });
    return createdUser;
  }

  async updateUser(id: string, newUser: UserInfoInput) {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...newUser,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return deletedUser;
  }
}

export const userController = new UserController();
