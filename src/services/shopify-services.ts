/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ParamsShopifyGetProduct {
  first: number
  after?: string
  before?: string
  query?: string
}

export interface ShopifyServices {
  getProducts(params: ParamsShopifyGetProduct): Promise<any | null>
}
