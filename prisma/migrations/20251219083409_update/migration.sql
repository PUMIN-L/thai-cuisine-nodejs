/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `total_amount`,
    ADD COLUMN `total_price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `category_id`,
    ADD COLUMN `category_name` VARCHAR(191) NULL,
    ADD COLUMN `public_id` VARCHAR(191) NULL,
    MODIFY `price` VARCHAR(191) NOT NULL DEFAULT '0',
    MODIFY `quantity` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `public_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_category_name_fkey` FOREIGN KEY (`category_name`) REFERENCES `Categories`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
