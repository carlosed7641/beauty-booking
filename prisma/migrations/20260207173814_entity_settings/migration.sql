-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "advanceBookingControl" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "cancelDateTime" INTEGER NOT NULL DEFAULT 20,
ADD COLUMN     "showAdminAgenda" BOOLEAN NOT NULL DEFAULT true;
