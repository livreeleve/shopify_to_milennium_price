/* eslint-disable @typescript-eslint/no-explicit-any */
import { shopifyApi } from '@/lib/graphql'
import {
  GetProductResponse,
  GetProductVariantsResponse,
  ParamsShopifyGetProduct,
  ParamsShopifyGetProductVariants,
  ShopifyServices,
} from '../shopify-services'
import { GET_PRODUCTS } from './graphql/get-product'
import { GET_PRODUCTS_VARIANTS } from './graphql/get-product-variants'

export class ShopifyService implements ShopifyServices {
  async getProducts(
    params: ParamsShopifyGetProduct,
  ): Promise<GetProductResponse | null> {
    try {
      const data = await shopifyApi.request(GET_PRODUCTS, {
        first: params.first,
        after: params.after,
      })

      return data
    } catch (err) {
      console.error(err)

      throw err
    }
  }

  async getVariants(
    params: ParamsShopifyGetProductVariants,
  ): Promise<GetProductVariantsResponse | null> {
    try {
      const data = await shopifyApi.request<GetProductVariantsResponse>(
        GET_PRODUCTS_VARIANTS,
        {
          first: params.first,
          query: params.query,
        },
      )

      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
