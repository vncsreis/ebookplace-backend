/*
  Warnings:

  - You are about to drop the column `gerne` on the `Book` table. All the data in the column will be lost.
  - Added the required column `genreId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "epub" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL,
    "addedAt" DATETIME NOT NULL,
    "lastRead" DATETIME NOT NULL,
    "owner" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("addedAt", "author", "epub", "favourite", "id", "image", "lastRead", "owner", "synopsis", "title", "year") SELECT "addedAt", "author", "epub", "favourite", "id", "image", "lastRead", "owner", "synopsis", "title", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
