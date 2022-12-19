-- AlterTable
ALTER TABLE `User` MODIFY `settings` VARCHAR(191) NOT NULL DEFAULT '{"timezone":"berlin","language":"en","theme":"dark","timerange":"week"}',
    MODIFY `active_tiles` VARCHAR(191) NOT NULL DEFAULT '{"livedata":true,"multidata":true,"bigchart":true,"goal":true,"smalltext":true,"smallchart":true}';
