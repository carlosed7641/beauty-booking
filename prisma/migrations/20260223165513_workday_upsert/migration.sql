/*
  Warnings:

  - A unique constraint covering the columns `[professionalId,name]` on the table `WorkDay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkDay_professionalId_name_key" ON "WorkDay"("professionalId", "name");
