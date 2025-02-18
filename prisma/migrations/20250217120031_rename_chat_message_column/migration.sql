/*
  Warnings:

  - You are about to drop the column `recieverId` on the `chat_message` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `chat_message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat_message" DROP CONSTRAINT "chat_message_recieverId_fkey";

-- AlterTable
ALTER TABLE "chat_message" DROP COLUMN "recieverId",
ADD COLUMN     "receiverId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
