-- AlterTable
ALTER TABLE `session` MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `view` MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);