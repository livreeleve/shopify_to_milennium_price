import { makeInsertPriceInMilennium } from '@/use-cases/factories/insert-price-in-milennium/make-insert-price-in-milennium'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function insertPriceInMilennium(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/v1/insert-price/milennium',
    {
      schema: {
        tags: ['Insert price'],
        summary: 'Enter price in Milennium.',
        body: z.object({
          type: z.enum(['price', 'compareAtPrice']),
          tabela: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { type, tabela } = request.body
        const insertPriceInMilenniumUseCase = makeInsertPriceInMilennium()

        await insertPriceInMilenniumUseCase.execute({ type, tabela })

        return reply.status(200).send({ message: 'sucesso!' })
      } catch (err) {
        if (err instanceof Error) {
          console.log(err, 'o error')

          return reply.status(400).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
