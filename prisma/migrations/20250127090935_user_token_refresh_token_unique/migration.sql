/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `user_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_token_refreshToken_key" ON "user_token"("refreshToken");
