/*
  Warnings:

  - A unique constraint covering the columns `[articleId]` on the table `auction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auction_articleId_key" ON "auction"("articleId");
