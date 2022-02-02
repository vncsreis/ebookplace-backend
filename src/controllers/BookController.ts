import { prisma } from '../../prisma/client';
import { BookInfoInput } from '../models/BookInfoInput';

class BookController {
  async getBooks() {
    const books = await prisma.book.findMany();
    return books;
  }

  async getBookById(id: number) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });
    return book;
  }

  async getBooksByUserId(userId: number) {
    const userBooks = await prisma.book.findMany({
      where: {
        userId,
      },
    });
    return userBooks;
  }

  async getBooksByGenreId(genreId: number) {
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
        favourite: false,
        addedAt: new Date(),
        lastRead: new Date(),
      },
    });
    return createdBook;
  }

  async deleteBook(id: number) {
    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });
    return deletedBook;
  }

  async updateBook(id: number, newBook: BookInfoInput) {
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
