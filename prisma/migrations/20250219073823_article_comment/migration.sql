-- CreateTable
CREATE TABLE "article_comment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "deleteTime" TIMESTAMP(3),

    CONSTRAINT "article_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "article_comment" ADD CONSTRAINT "article_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_comment" ADD CONSTRAINT "article_comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
