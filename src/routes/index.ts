import { Router } from 'express';
import { userRouter } from './userRouter';
import { bookRouter } from './bookRouter';
import { genreRouter } from './genreRouter';
import { loginRouter } from './loginRouter';

export const router = Router();

router.use('/user', userRouter);

router.use('/book', bookRouter);

router.use('/genre', genreRouter);

router.use('/login', loginRouter);
