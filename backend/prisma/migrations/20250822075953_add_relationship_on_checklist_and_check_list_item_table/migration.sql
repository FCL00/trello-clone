/*
  Warnings:

  - Added the required column `checklistId` to the `CheckListItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklistitems` ADD COLUMN `checklistId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CheckListItems` ADD CONSTRAINT `CheckListItems_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `CheckList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
