/* eslint-disable @typescript-eslint/no-explicit-any */
import { shopifyApi } from '@/lib/graphql'
import { ParamsShopifyGetProduct, ShopifyServices } from '../shopify-services'
import { GET_PRODUCTS } from './graphql/get-product'

export class ShopifyService implements ShopifyServices {
  async getProducts(params: ParamsShopifyGetProduct): Promise<any | null> {
    try {
      console.log(params, 'aqui os paramentros')
      const data = await shopifyApi.request(GET_PRODUCTS, {
        first: params.first,
      })

      return data
    } catch (err) {
      console.error(err)

      throw err
    }
  }

  async getVariants(params: any): Promise<any | null> {
    try {
      console.log(params, 'aqui os paramentros')
    } catch (error) {
      console.log(error)
    }
  }
}
