import { Router } from 'express';
import { bookController } from '../controllers/BookController';
import multer, { MulterError } from 'multer';
import path from 'path';
import mime from 'mime';
import { v4 as uuidv4 } from 'uuid';

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

export const bookRouter = Router();

bookRouter.get('/', bookController.getBooks);

bookRouter.get('/:id', bookController.getBookById);

bookRouter.get('/user/:userId', bookController.getBooksByUserId);

bookRouter.get('/user/:genreId', bookController.getBooksByGenreId);

bookRouter.post(
  '/',
  upload.fields([
    { name: 'epub', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  bookController.createBook,
);

bookRouter.delete('/:id', bookController.deleteBook);

bookRouter.put(
  '/:id',
  upload.fields([
    { name: 'epub', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  bookController.updateBook,
);
