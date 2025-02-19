-- CreateTable
CREATE TABLE "article_file" (
    "articleId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "article_file_pkey" PRIMARY KEY ("articleId","fileId")
);

-- AddForeignKey
ALTER TABLE "article_file" ADD CONSTRAINT "article_file_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_file" ADD CONSTRAINT "article_file_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
