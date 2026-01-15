/*
  Warnings:

  - You are about to drop the column `category` on the `ServiceCategory` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `ServiceCategory` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `ServiceCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_entityId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceCategory" DROP CONSTRAINT "ServiceCategory_entityId_fkey";

-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressReference" TEXT,
ADD COLUMN     "shopType" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "durationHours" SET DEFAULT 0,
ALTER COLUMN "durationMinutes" SET DEFAULT 30;

-- AlterTable
ALTER TABLE "ServiceCategory" DROP COLUMN "category",
DROP COLUMN "entityId",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
