/*
  Warnings:

  - Made the column `price` on table `ServiceOverride` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `ServiceOverride` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ServiceOverride" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;
