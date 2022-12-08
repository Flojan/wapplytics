-- CreateTable
CREATE TABLE `session` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_uuid` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `website_id` INTEGER NOT NULL,
    `website_url` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `browser` VARCHAR(191) NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `screen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
