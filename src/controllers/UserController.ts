import { prisma } from '../../prisma/client';
import { UserInfoInput } from '../models/UserInfoInput';

class UserController {
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUserById(id: number) {
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
        ...user,
      },
    });
    return createdUser;
  }

  async updateUser(id: number, newUser: UserInfoInput) {
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

  async deleteUser(id: number) {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return deletedUser;
  }
}

export const userController = new UserController();
