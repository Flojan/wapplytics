/*
  Warnings:

  - A unique constraint covering the columns `[session_uuid]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[website_nanoid]` on the table `website` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `session_session_uuid_key` ON `session`(`session_uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `website_website_nanoid_key` ON `website`(`website_nanoid`);
