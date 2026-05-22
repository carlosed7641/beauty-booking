/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_countryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- DropTable
DROP TABLE "Country";
