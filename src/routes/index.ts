import { Router } from 'express';
import { userRouter } from './userRouter';
import { bookRouter } from './bookRouter';
import { genreRouter } from './genreRouter';
import { loginRouter } from './loginRouter';
import { requireLogin } from '../middleware/requireLogin';
import path from 'path';
import { getErrorMessage } from '../utilities/getErrorMessage';

export const router = Router();

router.use('/user', userRouter);

router.use('/book', requireLogin, bookRouter);

router.use('/genre', requireLogin, genreRouter);

router.use('/login', loginRouter);

router.get('/static/:id', requireLogin, (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', '..', 'uploads', req.params.id));
  } catch (e) {
    res.status(400).json({ error: getErrorMessage(e) });
  }
});

router.get('/static/epub/:id', requireLogin, (req, res) => {
  try {
    res.sendFile(
      path.join(__dirname, '..', '..', 'uploads', 'epub', req.params.id),
    );
  } catch (e) {
    res.status(400).json({ error: getErrorMessage(e) });
  }
});
