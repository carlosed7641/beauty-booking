-- DropForeignKey
ALTER TABLE "WorkSampleImage" DROP CONSTRAINT "WorkSampleImage_sampleId_fkey";

-- AddForeignKey
ALTER TABLE "WorkSampleImage" ADD CONSTRAINT "WorkSampleImage_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "WorkSample"("id") ON DELETE CASCADE ON UPDATE CASCADE;
