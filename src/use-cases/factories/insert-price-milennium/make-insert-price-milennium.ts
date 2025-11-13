import { PrismaService } from '@/services/prisma-services/prisma-service'
import { ShopifyService } from '@/services/shopify-services/shopify-service'
import { InsertPriceMilenniumUseCase } from '@/use-cases/insert-price-to-milennium-use-case'

export function makeInsertPriceMilennium() {
  const shopifyService = new ShopifyService()
  const prismaService = new PrismaService()
  const insertPriceMilenniumUseCase = new InsertPriceMilenniumUseCase(
    shopifyService,
    prismaService,
  )

  return insertPriceMilenniumUseCase
}
