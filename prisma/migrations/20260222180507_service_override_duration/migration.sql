/*
  Warnings:

  - You are about to drop the column `duration` on the `ServiceOverride` table. All the data in the column will be lost.
  - Added the required column `durationHours` to the `ServiceOverride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMinutes` to the `ServiceOverride` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceOverride" DROP COLUMN "duration",
ADD COLUMN     "durationHours" INTEGER NOT NULL,
ADD COLUMN     "durationMinutes" INTEGER NOT NULL;
