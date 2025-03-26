/*
  Warnings:

  - Added the required column `isOver` to the `auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction" ADD COLUMN     "isOver" BOOLEAN NOT NULL;
