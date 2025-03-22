/*
  Warnings:

  - Added the required column `imageHref` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "imageHref" TEXT NOT NULL;
