/*
  Warnings:

  - You are about to drop the column `formato` on the `Championship` table. All the data in the column will be lost.
  - Added the required column `format` to the `Championship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Championship" DROP COLUMN "formato",
ADD COLUMN     "format" TEXT NOT NULL;
