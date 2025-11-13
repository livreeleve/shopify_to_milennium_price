import { FastifyInstance } from 'fastify'
import { insertPriceMilennium } from './insert-price-milennium/insert-price-milennium'

export function routes(app: FastifyInstance) {
  app.register(insertPriceMilennium)
}
