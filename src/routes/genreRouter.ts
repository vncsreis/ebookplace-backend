import { Router } from 'express';
import { genreController } from '../controllers/GenreController';

export const genreRouter = Router();

genreRouter.get('/', async (req, res) => {
  try {
    const genres = await genreController.getGenres();
    res.send(JSON.stringify(genres));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

genreRouter.get('/:id', async (req, res) => {
  try {
    const genre = await genreController.getGenreById(req.params.id);
    res.send(JSON.stringify(genre));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

genreRouter.post('/', async (req, res) => {
  try {
    const createdGenre = await genreController.createGenre(req.body);
    res.send(JSON.stringify(createdGenre));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

genreRouter.put('/:id', async (req, res) => {
  try {
    const updatedGenre = await genreController.updateGenre(
      req.params.id,
      req.body,
    );
    res.send(JSON.stringify(updatedGenre));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});

genreRouter.delete('/:id', async (req, res) => {
  try {
    const deletedGenre = await genreController.deleteGenre(req.params.id);
    res.send(JSON.stringify(deletedGenre));
  } catch (e) {
    res.status(400).send(JSON.stringify(e));
  }
});
