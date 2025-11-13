/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ParamsShopifyGetProduct {
  first: number
  after?: string
  before?: string
  query?: string
}

export interface GetProductResponse {
  products: {
    pageInfo: {
      startCursor: string
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
    edges: {
      node: {
        legacyResourceId: string
        title: string
        tags: string[]
        status: string
      }
    }[]
  }
}

export interface ShopifyServices {
  getProducts(
    params: ParamsShopifyGetProduct,
  ): Promise<GetProductResponse | null>
  getVariants(params: any): Promise<any | null>
}
