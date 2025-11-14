import { PageInfo } from '@/generated/prisma/client'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  VariantsCreateManyInput,
} from '@/generated/prisma/models'
import { PrismaServices } from '../prisma-services'
import { prisma } from '@/lib/prisma'
import { BatchPayload } from '@/generated/prisma/internal/prismaNamespace'

export class PrismaService implements PrismaServices {
  async createManyProduct(data: ProductCreateInput[]): Promise<BatchPayload> {
    const product = await prisma.product.createMany({
      data,
      skipDuplicates: true,
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

  async createManyVariant(
    data: VariantsCreateManyInput[],
  ): Promise<BatchPayload> {
    const variants = await prisma.variants.createMany({
      data,
      skipDuplicates: true,
    })

    return variants
  }

  async getPageInfo(): Promise<PageInfo | null> {}
}
