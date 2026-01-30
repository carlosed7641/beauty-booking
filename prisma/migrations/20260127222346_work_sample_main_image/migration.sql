/*
  Warnings:

  - You are about to drop the column `mainImage` on the `WorkSampleImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkSampleImage" DROP COLUMN "mainImage",
ADD COLUMN     "main" BOOLEAN;
