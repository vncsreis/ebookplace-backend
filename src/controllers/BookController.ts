import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/client';
import { BookInfoInput } from '../models/BookInfoInput';

class BookController {
  async getBooks() {
    const books = await prisma.book.findMany();
    return books;
  }

  async getBookById(id: string) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });
    return book;
  }

  async getBooksByUserId(userId: string) {
    const userBooks = await prisma.book.findMany({
      where: {
        userId,
      },
    });
    return userBooks;
  }

  async getBooksByGenreId(genreId: string) {
    const genreBooks = await prisma.book.findMany({
      where: {
        genreId,
      },
    });
    return genreBooks;
  }

  async createBook(book: BookInfoInput) {
    const createdBook = await prisma.book.create({
      data: {
        ...book,
        id: uuidv4(),
        favourite: false,
        addedAt: new Date(),
        lastRead: new Date(),
      },
    });
    return createdBook;
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
