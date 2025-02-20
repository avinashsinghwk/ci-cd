-- CreateTable
CREATE TABLE "P2pTranaction" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "P2pTranaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2pTranaction" ADD CONSTRAINT "P2pTranaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2pTranaction" ADD CONSTRAINT "P2pTranaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
