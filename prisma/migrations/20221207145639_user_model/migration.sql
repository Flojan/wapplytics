-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `settings` VARCHAR(191) NOT NULL DEFAULT '{''timezone'':''berlin'',''language'':''en'',''theme'':''dark'',''timerange'':''week''}',
    `active_tiles` VARCHAR(191) NOT NULL DEFAULT '{''livedata'':''true'',''multidata'':''true'',''bigchart'':''true'',''goal'':''true'',''smalltext'':''true'',''smallchart'':''true''}',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
