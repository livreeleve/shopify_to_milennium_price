import { MilenniumService } from '@/services/milennium-services/milennium-service'
import { PrismaService } from '@/services/prisma-services/prisma-service'
import { InsertPriceInMilenniumUseCase } from '@/use-cases/insert-price-in-milennium'

export function makeInsertPriceInMilennium() {
  const prismaService = new PrismaService()
  const milenniumService = new MilenniumService()
  const insertPriceInMilenniumUseCase = new InsertPriceInMilenniumUseCase(
    prismaService,
    milenniumService,
  )

  return insertPriceInMilenniumUseCase
}
