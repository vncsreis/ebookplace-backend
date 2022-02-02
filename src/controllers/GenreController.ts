import { prisma } from '../../prisma/client';
import { GenreInfoInput } from '../models/GenreInfoInput';

class GenreController {
  async getGenres() {
    const genres = await prisma.genre.findMany();
    return genres;
  }

  async getGenreById(id: number) {
    const genre = await prisma.genre.findUnique({ where: { id } });
    return genre;
  }

  async createGenre(genre: GenreInfoInput) {
    const createdGenre = await prisma.genre.create({ data: { ...genre } });
    return createdGenre;
  }

  async updateGenre(id: number, genre: GenreInfoInput) {
    const updatedGenre = await prisma.genre.update({
      where: { id },
      data: { ...genre },
    });
    return updatedGenre;
  }

  async deleteGenre(id: number) {
    const deletedGenre = await prisma.genre.delete({ where: { id } });
    return deletedGenre;
  }
}

export const genreController = new GenreController();
