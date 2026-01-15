/*
  Warnings:

  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `indicator` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Made the column `shareNumberPhone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "indicator" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastName",
ALTER COLUMN "shareNumberPhone" SET NOT NULL,
ALTER COLUMN "shareNumberPhone" SET DEFAULT false;
