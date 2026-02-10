-- DropForeignKey
ALTER TABLE "WorkDay" DROP CONSTRAINT "WorkDay_entityId_fkey";

-- AlterTable
ALTER TABLE "WorkDay" ADD COLUMN     "professionalId" TEXT,
ALTER COLUMN "entityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
