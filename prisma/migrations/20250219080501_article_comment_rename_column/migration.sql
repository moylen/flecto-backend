/*
  Warnings:

  - You are about to drop the column `userId` on the `article_comment` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `article_comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "article_comment" DROP CONSTRAINT "article_comment_userId_fkey";

-- AlterTable
ALTER TABLE "article_comment" DROP COLUMN "userId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "article_comment" ADD CONSTRAINT "article_comment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
