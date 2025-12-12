/*
  Warnings:

  - You are about to drop the column `carId` on the `ParkingRecord` table. All the data in the column will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `plate` to the `ParkingRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingRecord" DROP CONSTRAINT "ParkingRecord_carId_fkey";

-- DropIndex
DROP INDEX "ParkingRecord_carId_idx";

-- DropIndex
DROP INDEX "ParkingRecord_parkingLotId_idx";

-- AlterTable
ALTER TABLE "ParkingRecord" DROP COLUMN "carId",
ADD COLUMN     "plate" TEXT NOT NULL;

-- DropTable
DROP TABLE "Car";

-- CreateIndex
CREATE INDEX "ParkingRecord_plate_parkingLotId_exitTime_idx" ON "ParkingRecord"("plate", "parkingLotId", "exitTime");
