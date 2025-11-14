import { PageInfo } from '@/generated/prisma/client'
import { BatchPayload } from '@/generated/prisma/internal/prismaNamespace'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  VariantsCreateManyInput,
} from '@/generated/prisma/models'

export interface PrismaServices {
  createManyProduct(data: ProductCreateInput[]): Promise<BatchPayload>
  upsertPageInfo(data: PageInfoCreateInput): Promise<PageInfo>
  createManyVariant(data: VariantsCreateManyInput[]): Promise<BatchPayload>
  getPageInfo(): Promise<PageInfo | null>
}
