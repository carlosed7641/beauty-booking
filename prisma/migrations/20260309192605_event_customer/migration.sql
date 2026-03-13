-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_customerId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
