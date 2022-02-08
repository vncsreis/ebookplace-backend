import { Router } from 'express';
import { genreController } from '../controllers/GenreController';

export const genreRouter = Router();

genreRouter.get('/', genreController.getGenres);

genreRouter.get('/:id', genreController.getGenreById);

genreRouter.post('/', genreController.createGenre);

genreRouter.put('/:id', genreController.updateGenre);

genreRouter.delete('/:id', genreController.deleteGenre);
