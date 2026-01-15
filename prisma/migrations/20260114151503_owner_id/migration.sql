/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryId` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "countryId" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "followers" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Entity_ownerId_key" ON "Entity"("ownerId");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
