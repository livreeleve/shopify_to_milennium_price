import { makeGetPriceShopifyAndSaveDatabase } from '@/use-cases/factories/get-price-shopify-and-save-database/make-get-price-shopify-and-save-database'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function getPriceShopifyAndSaveDatabase(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/v1/get/products',
    {
      schema: {
        tags: ['Insert price'],
        summary: 'Enter price in Milennium.',
        querystring: z.object({
          first: z.coerce.number(),
          after: z.string().optional(),
          before: z.string().optional(),
          query: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const params = request.query

        const getPriceShopifyAndSaveUseCase =
          makeGetPriceShopifyAndSaveDatabase()

        const { message } = await getPriceShopifyAndSaveUseCase.execute(params)

        return reply.status(200).send({ message })
      } catch (error) {
        if (error instanceof Error) {
          console.log(error, 'o error')
          return reply.status(400).send({ message: error.message })
        }

        throw error
      }
    },
  )
}
