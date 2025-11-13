import { PageInfo, Variants } from '@/generated/prisma/client'
import { BatchPayload } from '@/generated/prisma/internal/prismaNamespace'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  VariantsCreateInput,
} from '@/generated/prisma/models'

export interface PrismaServices {
  createManyProduct(data: ProductCreateInput[]): Promise<BatchPayload>
  upsertPageInfo(data: PageInfoCreateInput): Promise<PageInfo>
  createVariant(data: VariantsCreateInput): Promise<Variants>
}
