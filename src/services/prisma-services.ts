import { PageInfo, Product, Variants } from '@/generated/prisma/client'
import {
  PageInfoCreateInput,
  ProductCreateInput,
  VariantsCreateInput,
} from '@/generated/prisma/models'

export interface PrismaServices {
  createProduct(data: ProductCreateInput): Promise<Product>
  upsertPageInfo(data: PageInfoCreateInput): Promise<PageInfo>
  createVariant(data: VariantsCreateInput): Promise<Variants>
}
