import { PrismaService } from '@/services/prisma-services/prisma-service'
import { ShopifyService } from '@/services/shopify-services/shopify-service'
import { GetPriceShopifyAndSaveDatabaseUseCase } from '@/use-cases/get-price-shopify-and-save-database-use-case'

export function makeGetPriceShopifyAndSaveDatabase() {
  const shopifyService = new ShopifyService()
  const prismaService = new PrismaService()
  const getPriceShopifyAndSaveDatabaseUseCase =
    new GetPriceShopifyAndSaveDatabaseUseCase(shopifyService, prismaService)

  return getPriceShopifyAndSaveDatabaseUseCase
}
