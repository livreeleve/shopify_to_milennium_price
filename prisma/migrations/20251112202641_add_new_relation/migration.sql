/*
  Warnings:

  - Added the required column `product_id` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_variants_id_fkey";

-- AlterTable
ALTER TABLE "variants" ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "variants_product_id_idx" ON "variants"("product_id");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("legacy_resource_id") ON DELETE CASCADE ON UPDATE CASCADE;
