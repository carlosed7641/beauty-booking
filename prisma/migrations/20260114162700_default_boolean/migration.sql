/*
  Warnings:

  - Made the column `shareNumberPhone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "shareNumberPhone" SET NOT NULL,
ALTER COLUMN "shareNumberPhone" SET DEFAULT false;
