-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `settings` VARCHAR(191) NOT NULL DEFAULT '{''timezone'':''berlin'',''language'':''en'',''theme'':''dark'',''timerange'':''week''}',
    `active_tiles` VARCHAR(191) NOT NULL DEFAULT '{''livedata'':''true'',''multidata'':''true'',''bigchart'':''true'',''goal'':''true'',''smalltext'':''true'',''smallchart'':''true''}',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `website` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `website_nanoid` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `website_url` VARCHAR(191) NOT NULL,
    `website_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `website_website_nanoid_key`(`website_nanoid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `website_id` INTEGER NOT NULL,
    `goal_name` VARCHAR(191) NOT NULL,
    `indicators` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `target` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_uuid` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,
    `website_id` INTEGER NOT NULL,
    `website_url` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `browser` VARCHAR(191) NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `screen` VARCHAR(191) NOT NULL,
    `referrer` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `session_session_uuid_key`(`session_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `view` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `session_id` INTEGER NOT NULL,
    `website_id` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `goal` ADD CONSTRAINT `goal_website_id_fkey` FOREIGN KEY (`website_id`) REFERENCES `website`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_website_id_fkey` FOREIGN KEY (`website_id`) REFERENCES `website`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `view` ADD CONSTRAINT `view_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
