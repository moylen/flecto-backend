-- CreateTable
CREATE TABLE "chat_message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recieverId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "deleteTime" TIMESTAMP(3),

    CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
