/*
  Warnings:

  - You are about to drop the `taskstatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `taskstatus` DROP FOREIGN KEY `TaskStatus_taskId_fkey`;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `status` ENUM('ongoing', 'completed', 'abandon', 'archive') NOT NULL DEFAULT 'ongoing',
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `taskstatus`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
