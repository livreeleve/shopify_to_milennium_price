import { PrismaServices } from '@/services/prisma-services'
import { ShopifyServices } from '@/services/shopify-services'

interface InserPriceMilenniumUseCaseRequest {
  first: number
  after?: string
  before?: string
  query?: string
}

export class InsertPriceMilenniumUseCase {
  constructor(
    private shopifyService: ShopifyServices,
    private prismaService: PrismaServices,
  ) {}

  async execute(params: InserPriceMilenniumUseCaseRequest) {
    const productsData = await this.shopifyService.getProducts(params)

    const pageInfo = productsData?.products?.pageInfo

    const lastPageInfo = await this.prismaService.upsertPageInfo(pageInfo)

    console.log(JSON.stringify(lastPageInfo, null, 2))

    console.log(
      JSON.stringify(productsData, null, 2),
      'o resultado do response',
    )
  }
}
