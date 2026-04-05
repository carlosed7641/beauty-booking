/*
  Warnings:

  - A unique constraint covering the columns `[linkingCode]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - Made the column `linkingCode` on table `Entity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entity" ALTER COLUMN "linkingCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Entity_linkingCode_key" ON "Entity"("linkingCode");
