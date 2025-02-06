/*
  Warnings:

  - Added the required column `poster` to the `Catalogo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalogo" ADD COLUMN     "poster" TEXT NOT NULL;
