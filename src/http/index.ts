import { FastifyInstance } from 'fastify'
import { getPriceShopifyAndSaveDatabase } from './insert-price-milennium/get-price-shopify'
import { insertPriceInMilennium } from './insert-price-milennium/insert-price-in-milennium'

export function routes(app: FastifyInstance) {
  app.register(getPriceShopifyAndSaveDatabase)
  app.register(insertPriceInMilennium)
}
