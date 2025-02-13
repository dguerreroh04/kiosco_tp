/*
  Warnings:

  - Added the required column `productos_comprados` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "productos_comprados" TEXT NOT NULL;
