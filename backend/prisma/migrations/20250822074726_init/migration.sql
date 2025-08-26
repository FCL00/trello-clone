/*
  Warnings:

  - You are about to drop the column `name` on the `checklist` table. All the data in the column will be lost.
  - You are about to drop the `checklistitem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `CheckList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `CheckList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CheckList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `checklistitem` DROP FOREIGN KEY `CheckListItem_checklistId_fkey`;

-- AlterTable
ALTER TABLE `checklist` DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` ENUM('active', 'not_active', 'pending', 'approve') NOT NULL,
    ADD COLUMN `taskId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('OWNER', 'ADMIN', 'MEMBER', 'OBSERVER') NOT NULL;

-- DropTable
DROP TABLE `checklistitem`;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `taskStatusId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskStatus` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'not_active', 'pending', 'approve') NOT NULL DEFAULT 'active',
    `taskId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TaskStatus_taskId_key`(`taskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckListItems` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `task` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'not_active', 'pending', 'approve') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `id` VARCHAR(191) NOT NULL,
    `taskid` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'not_active', 'pending', 'approve') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskStatus` ADD CONSTRAINT `TaskStatus_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckList` ADD CONSTRAINT `CheckList_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_taskid_fkey` FOREIGN KEY (`taskid`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
