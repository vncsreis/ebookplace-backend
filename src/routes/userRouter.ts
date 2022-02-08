import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';
import { userController } from '../controllers/UserController';
import { validateCreateUser } from '../middleware/validateCreateUser';
import { requireLogin } from '../middleware/requireLogin';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (req, file, next) => {
    next(null, `${Date.now()}${uuidv4()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 15728640,
  },
});

export const userRouter = Router();

userRouter.get('/', requireLogin, userController.getUsers);

userRouter.get('/:id', requireLogin, userController.getUserById);

userRouter.post(
  '/',
  upload.fields([{ name: 'picture', maxCount: 1 }]),
  validateCreateUser,
  userController.createUser,
);

userRouter.put(
  '/:id',
  requireLogin,
  upload.fields([{ name: 'picture', maxCount: 1 }]),
  userController.updateUser,
);

userRouter.put('/:id/password', requireLogin, userController.updatePassword);

userRouter.delete('/:id', requireLogin, userController.deleteUser);
