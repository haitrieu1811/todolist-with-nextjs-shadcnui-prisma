-- CreateEnum
CREATE TYPE "Level" AS ENUM ('DELIBERATELY', 'NORMAL', 'DEADLINE');

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "level" "Level" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
