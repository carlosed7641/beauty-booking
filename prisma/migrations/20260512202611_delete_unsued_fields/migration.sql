-- AlterTable
ALTER TABLE "Entity" ALTER COLUMN "advanceBookingControl" DROP NOT NULL,
ALTER COLUMN "advanceBookingControl" DROP DEFAULT,
ALTER COLUMN "showAdminAgenda" DROP NOT NULL,
ALTER COLUMN "showAdminAgenda" DROP DEFAULT;
