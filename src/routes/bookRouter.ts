import { Router } from 'express';
import { bookController } from '../controllers/BookController';
import multer, { MulterError } from 'multer';
import path from 'path';
import mime from 'mime';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let pathType = '';
    let type = mime.extension(file.mimetype);
    if (type === 'epub') {
      pathType = 'epub';
    }
    let dir = path.join(__dirname, '../../uploads', pathType);
    let ok = false;
    fs.access(dir, fs.constants.F_OK, (err) => {
      ok = true;
    });
    if (ok) {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
    callback(null, dir);
  },
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

bookRouter.get('/:id/favourite', bookController.toggleBookFavourite);

bookRouter.get('/user/:userId', bookController.getBooksByUserId);

bookRouter.get('/genre/:genreId', bookController.getBooksByGenreId);

bookRouter.get('/user/:userId/:genreId', bookController.getBooksByUserId);

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
