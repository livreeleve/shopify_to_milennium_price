-- AlterTable
ALTER TABLE "product" ADD COLUMN     "status" TEXT,
ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "page_info" (
    "id" TEXT NOT NULL,
    "start_cursor" TEXT NOT NULL,
    "end_cursor" TEXT NOT NULL,
    "has_next_page" BOOLEAN NOT NULL,
    "has_previous_page" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_info_pkey" PRIMARY KEY ("id")
);
