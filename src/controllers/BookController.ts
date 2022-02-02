import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/client';
import { BookInfoInput } from '../models/BookInfoInput';

class BookController {
  async getBooks(req: Request, res: Response) {
    try {
      const books = await prisma.book.findMany();
      res.send(JSON.stringify(books));
    } catch (e) {
      res.status(400).send(JSON.stringify({ error: e }));
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await prisma.book.findUnique({
        where: {
          id: req.params.id,
        },
      });
      return res.send(JSON.stringify(book));
    } catch (e) {
      return res.status(400).send(JSON.stringify({ error: e }));
    }
  }

  async getBooksByUserId(req: Request, res: Response) {
    try {
      const userBooks = await prisma.book.findMany({
        where: {
          userId: req.params.userId,
        },
      });
      return res.send(JSON.stringify(userBooks));
    } catch (e) {
      return res.status(400).send(JSON.stringify({ error: e }));
    }
  }

  async getBooksByGenreId(req: Request, res: Response) {
    try {
      const genreBooks = await prisma.book.findMany({
        where: {
          userId: req.params.genreId,
        },
      });
      return res.send(JSON.stringify(genreBooks));
    } catch (e) {
      return res.status(400).send(JSON.stringify({ error: e }));
    }
  }

  // TODO: validate request body
  async createBook(req: Request, res: Response) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const body = req.body;

    try {
      const createdBook = await prisma.book.create({
        data: {
          id: uuidv4(),
          title: body.title,
          author: body.author,
          synopsis: body.synopsis,
          year: body.year,
          genreId: body.genreId,
          userId: body.userId,
          epub: files['epub'][0].filename,
          image: files['image'][0].filename,
          favourite: false,
          addedAt: new Date(),
          lastRead: new Date(),
        },
      });
      return res.send(JSON.stringify(createdBook));
    } catch (e) {
      return res.status(400).send(JSON.stringify({ error: e }));
    }
  }

  async deleteBook(id: string) {
    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });
    return deletedBook;
  }

  async updateBook(id: string, newBook: BookInfoInput) {
    const oldBook = await prisma.book.findUnique({ where: { id } });
    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: {
        lastRead: oldBook?.lastRead,
        addedAt: oldBook?.lastRead,
        favourite: oldBook?.favourite,
        ...newBook,
      },
    });
    return updatedBook;
  }
}

export const bookController = new BookController();
