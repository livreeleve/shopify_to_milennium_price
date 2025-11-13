import { PageInfo, Product, Variants } from '@/generated/prisma/client'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  VariantsCreateInput,
} from '@/generated/prisma/models'
import { PrismaServices } from '../prisma-services'
import { prisma } from '@/lib/prisma'

export class PrismaService implements PrismaServices {
  async createProduct(data: ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  async upsertPageInfo(data: PageInfoCreateInput): Promise<PageInfo> {
    const pageInfo = await prisma.pageInfo.upsert({
      where: {
        key: 'shopifyPageInfo',
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    })

    return pageInfo
  }

  async createVariant(data: VariantsCreateInput): Promise<Variants> {
    const variants = await prisma.variants.create({
      data,
    })

    return variants
  }
}
