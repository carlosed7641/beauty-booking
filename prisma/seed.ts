import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

// export const countries = [
//   { shortName: 'AR', name: 'Argentina', indicator: '54' },
//   { shortName: 'BO', name: 'Bolivia', indicator: '591' },
//   { shortName: 'CL', name: 'Chile', indicator: '56' },
//   { shortName: 'CO', name: 'Colombia', indicator: '57' },
//   { shortName: 'CR', name: 'Costa Rica', indicator: '506' },
//   { shortName: 'CU', name: 'Cuba', indicator: '53' },
//   { shortName: 'EC', name: 'Ecuador', indicator: '593' },
//   { shortName: 'SL', name: 'El Salvador', indicator: '503' },
//   { shortName: 'GT', name: 'Guatemala', indicator: '502' },
//   { shortName: 'HN', name: 'Honduras', indicator: '504' },
//   { shortName: 'MX', name: 'México', indicator: '52' },
//   { shortName: 'NC', name: 'Nicaragua', indicator: '505' },
//   { shortName: 'PN', name: 'Panamá', indicator: '507' },
//   { shortName: 'PY', name: 'Paraguay', indicator: '595' },
//   { shortName: 'PE', name: 'Perú', indicator: '51' },
//   { shortName: 'RD', name: 'Rep. Dominicana', indicator: '1' },
//   { shortName: 'UY', name: 'Uruguay', indicator: '598' },
//   { shortName: 'VE', name: 'Venezuela', indicator: '58' }
// ]

// const categories = [ 
//   { categoryName: "Cortes" },
//   { categoryName: "Peinados" },
//   { categoryName: "Color" },
//   { categoryName: "Uñas" },
//   { categoryName: "Cejas" },
//   { categoryName: "Pestañas" },
//   { categoryName: "Masajes" },
//   { categoryName: "Maquillajes" }
// ]

const defaultServices: Record<string, string[]> = {
  'Cortes': ['Corte', 'Corte hombre', 'Corte con barba', 'Corte niño'],
  'Peinados': ['Peinados', 'Trenzas'],
  'Color': ['Diseño color', 'Mechas', 'Efecto raíz'],
  'Uñas': ['Manos', 'Pies', 'Manos y pies'],
  'Cejas': ['Laminado', 'Micropigmentación'],
  'Pestañas': ['Efecto natural', 'Efecto pestañina'],
  'Masajes': ['Relajante', 'Deportivo', 'Reductor'],
  'Maquillajes': ['Sencillo', 'Artístico']
}


export async function main() {
  const categories = await prisma.serviceCategory.findMany()
  for (const c of categories) {
    for (const s of defaultServices[c.categoryName]) {
      await prisma.service.create({
        data: {
          name: s,
          category: {
            connect: { id: c.id }
          }
        }
      })
      // await prisma.serviceCategory.create({ data: c });
    }
  }
}

main();