/*
  Warnings:

  - Added the required column `name` to the `WorkDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isRegisterCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkDay" ADD COLUMN     "name" TEXT NOT NULL;
