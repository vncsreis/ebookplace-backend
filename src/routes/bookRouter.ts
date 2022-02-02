import { Router } from 'express';
import { bookController } from '../controllers/BookController';

export const bookRouter = Router();

bookRouter.get('/', async (req, res) => {
  try {
    const books = await bookController.getBooks();
    res.send(JSON.stringify(books));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

bookRouter.get('/:id', async (req, res) => {
  try {
    const book = await bookController.getBookById(req.params.id);
    res.send(JSON.stringify(book));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

bookRouter.get('/user/:userId', async (req, res) => {
  try {
    const booksByUser = await bookController.getBooksByUserId(
      req.params.userId,
    );
    res.send(JSON.stringify(booksByUser));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

bookRouter.get('/genre/:genreId', async (req, res) => {
  try {
    const booksByGenre = await bookController.getBooksByGenreId(
      req.params.genreId,
    );
    res.send(JSON.stringify(booksByGenre));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

bookRouter.post('/', async (req, res) => {
  try {
    const createdBook = await bookController.createBook(req.body);
    res.send(JSON.stringify(createdBook));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

bookRouter.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await bookController.deleteBook(req.params.id);
    res.send(JSON.stringify(deletedBook));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

bookRouter.put('/:id', async (req, res) => {
  try {
    const updatedBook = await bookController.updateBook(
      req.params.id,
      req.body,
    );
    res.send(JSON.stringify(updatedBook));
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});
