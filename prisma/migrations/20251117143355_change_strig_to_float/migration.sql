/*
  Warnings:

  - Changed the type of `price` on the `variants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `compare_at_price` on the `variants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "variants" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "compare_at_price",
ADD COLUMN     "compare_at_price" DOUBLE PRECISION NOT NULL;
