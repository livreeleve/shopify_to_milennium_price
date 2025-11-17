/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageInfo } from '@/generated/prisma/client'
import { BatchPayload } from '@/generated/prisma/internal/prismaNamespace'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  ProductGetPayload,
  VariantsCreateManyInput,
} from '@/generated/prisma/models'

type ProductWithVariants = ProductGetPayload<{ include: { variants: true } }>

export interface FindProductsWithValidVariantsTypes {
  products: ProductWithVariants[]
  count: number
}

export interface PrismaServices {
  createManyProduct(data: ProductCreateInput[]): Promise<BatchPayload>
  upsertPageInfo(data: PageInfoCreateInput): Promise<PageInfo>
  createManyVariant(data: VariantsCreateManyInput[]): Promise<BatchPayload>
  getPageInfo(): Promise<PageInfo | null>
  findProductsWithValidVariants(): Promise<FindProductsWithValidVariantsTypes | null>
}
