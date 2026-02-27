-- DropIndex
DROP INDEX "Customer_userId_entityId_key";

-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
