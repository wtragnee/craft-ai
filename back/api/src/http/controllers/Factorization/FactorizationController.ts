import { FastifyInstance } from 'fastify'
import httpErrors from 'http-errors'

import {
  // List route
  ListFactorizationInput,
  listFactorizationSchema,
  // Create route
  CreateFactorizationInput,
  createFactorizationSchema,
  // Get route
  GetFactorizationInput,
  getFactorizationSchema,
  // Update route
  UpdateFactorizationInput,
  updateFactorizationSchema,
} from './FactorizationSchema'
import { FactorizationHandler } from './FactorizationHandler'
import { IServices } from '../../../services'

export const registerFactorization = (
  server: FastifyInstance,
  services: IServices
): FastifyInstance => {
  const handler = new FactorizationHandler(services)

  /** List route */
  server.get<ListFactorizationInput>('/', listFactorizationSchema, async (request, reply) => {
    const response = await handler.listFactorization(request.query.fetchToProcessOnly === true)
    reply.code(200).send(response)
  })
  server.log.info('Added route list factorization')

  /** Post route */
  server.post<CreateFactorizationInput>('/:number', createFactorizationSchema, async (request, reply) => {
    const response = await handler.createFactorization(request.params.number)
    reply.code(200).send(response)
  })
  server.log.info('Added route create factorization')
  
  /** Get route */
  server.get<GetFactorizationInput>('/:number', getFactorizationSchema, async (request, reply) => {
    const response = await handler.getFactorization(request.params.number)
    if (!response) {
      return reply.code(404).send({ error: `Could not find factorization with id ${request.params.number}` })
    }
    reply.code(200).send(response)
  })
  server.log.info('Added route get factorization')
  
  /** Update route */
  server.put<UpdateFactorizationInput>('/:number', updateFactorizationSchema, async (request, reply) => {
    if (request.params.number !== request.body.number) {
      throw httpErrors(400, 'Invalid request')
    }
    const response = await handler.updateFactorization(request.body)
    reply.code(200).send(response)
  })
  server.log.info('Added route get factorization')
  return server
}
