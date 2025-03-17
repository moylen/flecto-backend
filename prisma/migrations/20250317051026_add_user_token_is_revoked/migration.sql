-- AlterTable
ALTER TABLE "user_token" ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false;
