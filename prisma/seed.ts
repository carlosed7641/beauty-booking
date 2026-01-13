import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const countries: Prisma.CountryCreateInput[] = [
    {
        name: 'Colombia',
        shortName: 'COL'
    },
    {
        name: 'Perú',
        shortName: 'PER'
    }
]

export async function main() {
  for (const c of countries) {
    await prisma.country.create({ data: c });
  }
}

main();