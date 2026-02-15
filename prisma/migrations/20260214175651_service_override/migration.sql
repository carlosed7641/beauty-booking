-- CreateTable
CREATE TABLE "ServiceOverride" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "price" INTEGER,
    "duration" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServiceOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOverride_serviceId_professionalId_key" ON "ServiceOverride"("serviceId", "professionalId");

-- AddForeignKey
ALTER TABLE "ServiceOverride" ADD CONSTRAINT "ServiceOverride_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOverride" ADD CONSTRAINT "ServiceOverride_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
