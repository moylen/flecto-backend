/*
  Warnings:

  - Added the required column `currentPrice` to the `auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction" ADD COLUMN     "currentPrice" DOUBLE PRECISION NOT NULL;
