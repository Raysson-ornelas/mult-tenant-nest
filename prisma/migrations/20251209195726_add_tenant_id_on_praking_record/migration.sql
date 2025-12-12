-- AlterTable
ALTER TABLE "ParkingRecord" ADD COLUMN     "tenantId" TEXT;

-- AddForeignKey
ALTER TABLE "ParkingRecord" ADD CONSTRAINT "ParkingRecord_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
