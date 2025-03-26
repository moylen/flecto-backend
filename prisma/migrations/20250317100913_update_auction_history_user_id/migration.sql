-- DropForeignKey
ALTER TABLE "auction_history" DROP CONSTRAINT "auction_history_userId_fkey";

-- AlterTable
ALTER TABLE "auction_history" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "auction_history" ADD CONSTRAINT "auction_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
