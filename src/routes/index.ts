import { Router } from 'express';
import { userRouter } from './userRouter';
import { bookRouter } from './bookRouter';
import { genreRouter } from './genreRouter';
import { loginRouter } from './loginRouter';
import { requireLogin } from '../middleware/requireLogin';

export const router = Router();

router.use('/user', requireLogin, userRouter);

router.use('/book', requireLogin, bookRouter);

router.use('/genre', requireLogin, genreRouter);

router.use('/login', loginRouter);
