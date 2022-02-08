import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/client';
import { BookCreateInfo, BookUpdateInfo } from '../models/BookInfoInput';
import { getErrorMessage } from '../utilities/getErrorMessage';

class BookController {
  async getBooks(req: Request, res: Response) {
    try {
      const books = await prisma.book.findMany();
      res.send(JSON.stringify(books));
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
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
      res.status(400).json({ error: getErrorMessage(e) });
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
      res.status(400).json({ error: getErrorMessage(e) });
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
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const newBook: BookCreateInfo = req.body;

      const createdBook = await prisma.book.create({
        data: {
          ...newBook,
          id: uuidv4(),
          epub: files['epub'][0].filename,
          image: files['image'][0].filename,
          favourite: false,
          addedAt: new Date(),
          lastRead: new Date(),
        },
      });
      return res.send(JSON.stringify(createdBook));
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedBook = await prisma.book.delete({
        where: {
          id,
        },
      });
      res.status(200).json(deletedBook);
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const newBook: BookUpdateInfo = req.body;
      const { id } = req.params;
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        if (files['image'] !== undefined) {
          newBook.image = files['image'][0].filename;
        }
        if (files['epub'] !== undefined) {
          newBook.epub = files['epub'][0].filename;
        }
      }
      const updatedBook = await prisma.book.update({
        where: {
          id,
        },
        data: {
          ...newBook,
        },
      });
      return updatedBook;
    } catch (e) {
      res.status(400).json({ error: getErrorMessage(e) });
    }
  }
}
export const bookController = new BookController();
