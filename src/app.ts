import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { treeifyError, ZodError } from 'zod'
import { env } from './env'
import { routes } from './http'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(routes)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Milennium search NFe',
      description: 'Milennium search NFe and set in the order',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: treeifyError(error),
    })
  }

  if (env.NODE_DEV !== 'production') {
    console.error(error)
  } else {
    // TODO: Herer we should lot to an external tool like DataDog/NewRelic?Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
