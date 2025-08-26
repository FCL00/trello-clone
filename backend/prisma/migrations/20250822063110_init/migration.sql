-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Checklist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckListItem` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `checklistId` VARCHAR(191) NOT NULL,
    `status` ENUM('ALL', 'ACTIVE', 'COMPLETE') NOT NULL DEFAULT 'ALL',

    INDEX `CheckListItem_checklistId_idx`(`checklistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckListItem` ADD CONSTRAINT `CheckListItem_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
