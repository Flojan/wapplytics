-- CreateTable
CREATE TABLE `goal` (
    `goal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `website_id` INTEGER NOT NULL,
    `goal_name` VARCHAR(191) NOT NULL,
    `indicators` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `target` INTEGER NOT NULL,

    PRIMARY KEY (`goal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
