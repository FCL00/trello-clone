/*
  Warnings:

  - You are about to alter the column `position` on the `checklistitem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `checklistitem` MODIFY `position` DOUBLE NOT NULL DEFAULT 0;
