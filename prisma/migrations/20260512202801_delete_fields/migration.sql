/*
  Warnings:

  - You are about to drop the column `advanceBookingControl` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `showAdminAgenda` on the `Entity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "advanceBookingControl",
DROP COLUMN "showAdminAgenda";
