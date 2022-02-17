import { Genre } from '@prisma/client';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/client';
import { GenreInfoInput } from '../models/GenreInfoInput';
import { getErrorMessage } from '../utilities/getErrorMessage';

class GenreController {
  async getGenres(req: Request, res: Response) {
    try {
      const genres = await prisma.genre.findMany();
      res.status(200).json(genres);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async getGenreById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genre = await prisma.genre.findUnique({ where: { id } });
      res.status(200).json(genre);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async getUserGenres(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const books = await prisma.book.findMany({ where: { userId } });
      const genres = await Promise.all(
        books.map(async (b) => {
          const genre = await prisma.genre.findUnique({
            where: { id: b.genreId },
          });
          if (genre) {
            return genre;
          }
        }),
      );
      let genresWithoutDuplicates = genres.filter((g, i, self) => {
        return (
          i === self.findIndex((t) => t?.genre === g?.genre && t?.id === g?.id)
        );
      });

      // genres.forEach((g) => {
      //   if (g) {
      //     if (genresWithoutDuplicates.findIndex(g) === -1) {
      //       genresWithoutDuplicates.push(g);
      //     }
      //   }
      // });

      return res.status(200).json(genresWithoutDuplicates);
    } catch (e) {
      return res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async createGenre(req: Request, res: Response) {
    try {
      const genre: GenreInfoInput = req.body;
      const createdGenre = await prisma.genre.create({
        data: { id: uuidv4(), ...genre },
      });
      res.status(200).json(createdGenre);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage });
    }
  }

  async updateGenre(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genre: GenreInfoInput = req.body;
      const updatedGenre = await prisma.genre.update({
        where: { id },
        data: { ...genre },
      });
      res.status(200).json(updatedGenre);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage });
    }
  }

  async deleteGenre(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedGenre = await prisma.genre.delete({ where: { id } });
      res.status(200).json(deletedGenre);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }
}

export const genreController = new GenreController();
