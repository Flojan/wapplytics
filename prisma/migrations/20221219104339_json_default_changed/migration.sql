-- AlterTable
ALTER TABLE `User` MODIFY `active_tiles` VARCHAR(191) NOT NULL DEFAULT '{"view":true,"unique-user":true,"avg-visit-time":true,"bounce-rate":true,"country":true,"path":true,"language":true,"browser":true,"os":true,"device":true,"screen":true,"referrer":true}';
