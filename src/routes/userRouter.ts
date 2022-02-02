import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { validateCreateUser } from '../middleware/validateCreateUser';

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await userController.getUsers();
    res.send(JSON.stringify(users));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.id);
    res.send(JSON.stringify(user));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

userRouter.post('/', validateCreateUser, async (req, res) => {
  try {
    const createdUser = await userController.createUser(req.body);
    res.send(JSON.stringify(createdUser));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userController.deleteUser(req.params.id);
    res.send(JSON.stringify(deletedUser));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userController.updateUser(
      req.params.id,
      req.body,
    );
    res.send(JSON.stringify(updatedUser));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});
