/*
  Warnings:

  - The values [begin,end,bid] on the enum `AuctionAction` will be removed. If these variants are still used in the database, this will fail.
  - The values [user,admin] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuctionAction_new" AS ENUM ('BEGIN', 'END', 'BID');
ALTER TABLE "auction_history" ALTER COLUMN "action" TYPE "AuctionAction_new" USING ("action"::text::"AuctionAction_new");
ALTER TYPE "AuctionAction" RENAME TO "AuctionAction_old";
ALTER TYPE "AuctionAction_new" RENAME TO "AuctionAction";
DROP TYPE "AuctionAction_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';
