/*
  Warnings:

  - You are about to drop the column `contentType` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `file` table. All the data in the column will be lost.
  - Added the required column `filename` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "contentType",
DROP COLUMN "fileName",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL;
