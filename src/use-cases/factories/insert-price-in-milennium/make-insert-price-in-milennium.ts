import { PrismaService } from '@/services/prisma-services/prisma-service'
import { InsertPriceInMilenniumUseCase } from '@/use-cases/insert-price-in-milennium'

export function makeInsertPriceInMilennium() {
  const prismaService = new PrismaService()
  const insertPriceInMilenniumUseCase = new InsertPriceInMilenniumUseCase(
    prismaService,
  )

  return insertPriceInMilenniumUseCase
}
