/*
  Warnings:

  - You are about to alter the column `position` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- DropIndex
DROP INDEX `Task_id_userId_key` ON `task`;

-- AlterTable
ALTER TABLE `task` MODIFY `position` DOUBLE NOT NULL DEFAULT 0;
