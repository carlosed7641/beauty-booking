/*
  Warnings:

  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `archived` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "archived" SET NOT NULL,
ALTER COLUMN "archived" SET DEFAULT false;
