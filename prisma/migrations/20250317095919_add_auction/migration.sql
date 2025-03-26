-- CreateEnum
CREATE TYPE "AuctionAction" AS ENUM ('begin', 'end', 'bid');

-- CreateTable
CREATE TABLE "auction" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "startPrice" DOUBLE PRECISION NOT NULL,
    "stepPrice" DOUBLE PRECISION NOT NULL,
    "untilTime" TIMESTAMP(3) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "deleteTime" TIMESTAMP(3),

    CONSTRAINT "auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction_history" (
    "id" SERIAL NOT NULL,
    "auctionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" "AuctionAction" NOT NULL,
    "bidValue" INTEGER,
    "isSystem" BOOLEAN NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auction_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_history" ADD CONSTRAINT "auction_history_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_history" ADD CONSTRAINT "auction_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
