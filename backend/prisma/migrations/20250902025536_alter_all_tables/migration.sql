/*
  Warnings:

  - You are about to drop the column `status` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `taskid` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comments` table. All the data in the column will be lost.
  - The values [abandon] on the enum `CheckListItem_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `checklist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checklistitems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `checklist` DROP FOREIGN KEY `CheckList_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `checklistitems` DROP FOREIGN KEY `CheckListItems_checklistId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_taskid_fkey`;

-- DropIndex
DROP INDEX `Comments_taskid_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `status`,
    DROP COLUMN `taskid`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `checklistItemId` VARCHAR(191) NULL,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('ongoing', 'completed', 'cancelled', 'archive') NOT NULL DEFAULT 'ongoing';

-- DropTable
DROP TABLE `checklist`;

-- DropTable
DROP TABLE `checklistitems`;

-- CreateTable
CREATE TABLE `CheckListItem` (
    `id` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('ongoing', 'completed', 'cancelled', 'archive') NOT NULL DEFAULT 'ongoing',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckListItem` ADD CONSTRAINT `CheckListItem_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_checklistItemId_fkey` FOREIGN KEY (`checklistItemId`) REFERENCES `CheckListItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
