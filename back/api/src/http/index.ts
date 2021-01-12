import { FastifyInstance } from 'fastify'
import { IServices } from '../services'

import { registerFactorization } from './controllers/Factorization/FactorizationController'

export const registerRoutes = (server: FastifyInstance, services: IServices) => {
  server.register((prefixedServer) => {
    server.log.info('Adding factorization routes')
    registerFactorization(prefixedServer, services)
    return prefixedServer
  }, { prefix: '/api/v1/factorization' })
}
