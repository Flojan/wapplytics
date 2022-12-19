/*
  Warnings:

  - You are about to drop the column `settings` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `settings`,
    ADD COLUMN `timerange` VARCHAR(191) NOT NULL DEFAULT 'week',
    ADD COLUMN `timezone` VARCHAR(191) NOT NULL DEFAULT 'Europe/Berlin';
