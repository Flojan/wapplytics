-- CreateTable
CREATE TABLE `view` (
    `view_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL,
    `session_id` INTEGER NOT NULL,
    `website_id` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `referrer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`view_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
