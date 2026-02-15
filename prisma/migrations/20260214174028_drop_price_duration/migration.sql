/*
  Warnings:

  - You are about to drop the column `durationHours` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `durationMinutes` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "durationHours",
DROP COLUMN "durationMinutes",
DROP COLUMN "price";
