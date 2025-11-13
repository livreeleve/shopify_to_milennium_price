/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `page_info` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "page_info" ADD COLUMN     "key" TEXT NOT NULL DEFAULT 'shopifyPageInfo';

-- CreateIndex
CREATE UNIQUE INDEX "page_info_key_key" ON "page_info"("key");
