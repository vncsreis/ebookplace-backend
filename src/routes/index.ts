import { Router } from 'express';
import { userRouter } from './userRouter';
import { bookRouter } from './bookRouter';
import { genreRouter } from './genreRouter';

export const router = Router();

router.use('/user', userRouter);

router.use('/book', bookRouter);

router.use('/genre', genreRouter);
