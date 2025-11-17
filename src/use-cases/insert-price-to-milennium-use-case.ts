/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaServices } from '@/services/prisma-services'
import { ShopifyServices } from '@/services/shopify-services'

interface InserPriceMilenniumUseCaseRequest {
  first: number
  after?: string
  before?: string
  query?: string
}

interface InsertPriceMilenniumUseCaseResponse {
  message: string
}

export class InsertPriceMilenniumUseCase {
  constructor(
    private shopifyService: ShopifyServices,
    private prismaService: PrismaServices,
  ) {}

  async execute(
    params: InserPriceMilenniumUseCaseRequest,
  ): Promise<InsertPriceMilenniumUseCaseResponse> {
    const savedPageInfo = await this.prismaService.getPageInfo()

    let hasNextPage = true
    let afterCursor: string | undefined = savedPageInfo?.hasNextPage
      ? savedPageInfo.endCursor
      : undefined

    while (hasNextPage) {
      const productsData = await this.shopifyService.getProducts({
        first: params.first,
        after: params.after ? params.after : afterCursor,
      })

      const products = productsData?.products.edges.map(
        (product) => product.node,
      )
      console.log('proxima página', afterCursor)

      const productsFiltered =
        productsData?.products?.edges?.map((item: any) => item.node) ?? []

      if (productsFiltered.length > 0) {
        await this.prismaService.createManyProduct(productsFiltered)
      }

      if (products && products.length > 0) {
        await Promise.all(
          products.map(async (product) => {
            const variantsResponse = await this.shopifyService.getVariants({
              first: 50,
              query: `product_id:${product.legacyResourceId}`,
            })

            const variants =
              variantsResponse?.productVariants.edges.flatMap(
                ({ node: variantNode }) => ({
                  legacyResourceId: variantNode.legacyResourceId,
                  title: variantNode.title,
                  displayName: variantNode.displayName,
                  price: variantNode.price,
                  compareAtPrice: variantNode.compareAtPrice
                    ? variantNode.compareAtPrice
                    : variantNode.price,
                  barcode: variantNode.barcode ?? null,
                  sku: variantNode.sku ? variantNode.sku : '',
                  createdAt: variantNode.createdAt,
                  updatedAt: variantNode.updatedAt,
                  productId: product.legacyResourceId,
                }),
              ) ?? []

            if (variants.length > 0) {
              await this.prismaService.createManyVariant(variants)
            }
          }),
        )
      }

      const pageInfo = productsData?.products?.pageInfo

      await this.prismaService.upsertPageInfo(pageInfo!)

      hasNextPage = pageInfo?.hasNextPage ?? false
      afterCursor = pageInfo?.endCursor
    }

    return {
      message: 'Importação de produto finalizada com sucesso!',
    }
  }
}
