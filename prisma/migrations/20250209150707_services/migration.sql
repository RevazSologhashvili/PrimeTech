-- CreateEnum
CREATE TYPE "ServiceBaseEnum" AS ENUM ('personal', 'business', 'enterprise');

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceBaseType" "ServiceBaseEnum" NOT NULL,
    "servicePriceOnsite" INTEGER,
    "servicePriceRemote" INTEGER,
    "isRemote" BOOLEAN NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");
