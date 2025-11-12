-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "legacy_resource_id" TEXT NOT NULL,
    "variants_id" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "legacy_resource_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "compare_at_price" TEXT NOT NULL,
    "barcode" TEXT,
    "sku" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_legacy_resource_id_key" ON "product"("legacy_resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "variants_legacy_resource_id_key" ON "variants"("legacy_resource_id");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_variants_id_fkey" FOREIGN KEY ("variants_id") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
