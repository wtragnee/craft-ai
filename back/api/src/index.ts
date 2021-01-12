import { fastify, FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'
import { Server, IncomingMessage, ServerResponse } from 'http'

import { initServices } from './services'
import { registerRoutes } from './http'

const start = async () => {
  // Init services
  const services = await initServices()
  
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })
  server.register(fastifyCors, {
    origin: true
  })
  try {
    server.setNotFoundHandler((request, reply) => {
      server.log.info('Route not found: ', request.url)
      reply.status(404).send({ message: 'Not found' })
    })

    server.setErrorHandler((error, request, reply) => {
      server.log.debug('Request url: ', request.url)
      server.log.debug('Payload: ', request.body)
      server.log.error('Error occurred: ', error)

      reply
        .status(error.statusCode || 500)
        .send({ message: error.message || 'Error occurred during request' })
    })

    registerRoutes(server, services)

    const port = services.config.port
    await server.listen(port, '0.0.0.0')
  } catch (err) {
    server.log.error(`Error when starting server: ${err.stack}`)
    process.exit()
  }
}

start()
