/*
  Warnings:

  - Made the column `is_change_price` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "is_change_price" SET NOT NULL,
ALTER COLUMN "is_change_price" SET DEFAULT false;
