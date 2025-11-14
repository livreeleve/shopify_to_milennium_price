/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const products = productsData?.products.edges.map((product) => product.node)

    const productsFiltered =
      productsData?.products?.edges?.map((item: any) => item.node) ?? []

    await this.prismaService.createManyProduct(productsFiltered)

    products?.map(async (product) => {
      const params = {
        first: 50,
        query: `product_id:${product.legacyResourceId}`,
      }
      const getVariants = await this.shopifyService.getVariants(params)

      const variants = getVariants?.productVariants.edges.flatMap(
        ({ node: variantNode }) => ({
          legacyResourceId: variantNode.legacyResourceId,
          title: variantNode.title,
          displayName: variantNode.displayName,
          price: variantNode.price,
          compareAtPrice: variantNode.compareAtPrice,
          barcode: variantNode.barcode ?? null,
          sku: variantNode.sku,
          createdAt: variantNode.createdAt,
          updatedAt: variantNode.updatedAt,
          productId: product.legacyResourceId,
        }),
      )

      if (variants && variants.length > 0)
        return await this.prismaService.createManyVariant(variants)
    })

    const pageInfo = productsData?.products?.pageInfo

    const lastPageInfo = await this.prismaService.upsertPageInfo(pageInfo!)

    console.log(JSON.stringify(lastPageInfo, null, 2))

    console.log(JSON.stringify(products, null, 2), 'o resultado do response')
  }
}
