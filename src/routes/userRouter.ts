import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { validateCreateUser } from '../middleware/validateCreateUser';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);

userRouter.get('/:id', userController.getUserById);

userRouter.post('/', validateCreateUser, userController.createUser);

userRouter.put('/:id', userController.updateUser);

userRouter.put('/:id/password', userController.updatePassword);

userRouter.delete('/:id', userController.deleteUser);
