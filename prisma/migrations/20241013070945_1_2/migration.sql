/*
  Warnings:

  - Added the required column `act` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "act" BOOLEAN NOT NULL;
