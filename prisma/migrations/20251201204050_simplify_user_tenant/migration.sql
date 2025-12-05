/*
  Warnings:

  - You are about to drop the `UserTenant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tenantId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTenant" DROP CONSTRAINT "UserTenant_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "UserTenant" DROP CONSTRAINT "UserTenant_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserTenant";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
