/*
  Warnings:

  - A unique constraint covering the columns `[numberId]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "numberId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Entity_numberId_key" ON "Entity"("numberId");
