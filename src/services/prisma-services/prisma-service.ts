/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageInfo } from '@/generated/prisma/client'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  ProductWhereInput,
  VariantsCreateManyInput,
} from '@/generated/prisma/models'
import {
  FindProductsWithValidVariantsTypes,
  PrismaServices,
} from '../prisma-services'
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

  async getPageInfo(): Promise<PageInfo | null> {
    const pageInfo = await prisma.pageInfo.findUnique({
      where: {
        key: 'shopifyPageInfo',
      },
    })

    return pageInfo
  }

  async findProductsWithValidVariants(): Promise<FindProductsWithValidVariantsTypes | null> {
    const where: ProductWhereInput = {
      isChangePrice: false,
      variants: {
        some: {
          sku: { not: '' },
          price: { gt: 0 },
        },
      },
    }

    const [products, count] = await prisma.$transaction([
      prisma.product.findMany({ where, include: { variants: true } }),
      prisma.product.count({ where }),
    ])

    return {
      products,
      count,
    }
  }

  async updateProduct(id: string, isChangePrice: boolean): Promise<any> {
    const product = await prisma.product.update({
      where: {
        legacyResourceId: id,
      },
      data: {
        isChangePrice,
      },
    })

    return product
  }
}
