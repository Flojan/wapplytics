-- CreateTable
CREATE TABLE `website` (
    `website_id` INTEGER NOT NULL AUTO_INCREMENT,
    `website_nanoid` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `website_url` VARCHAR(191) NOT NULL,
    `website_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`website_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
