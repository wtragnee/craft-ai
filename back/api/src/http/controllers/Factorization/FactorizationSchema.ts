import { RouteShorthandOptions } from 'fastify'
import { Factorization } from './FactorizationHandler'

const factorizationSchema = {
  type: 'object',
  properties: {
    number: { type: 'integer', minimum: 1 },
    creationTimestamp: { type: 'integer', minimum: 1 },
    startOfProcessTimestamp: { type: 'integer', minimum: 1, nullable: true },
    endOfProcessTimestamp: { type: 'integer', minimum: 1, nullable: true },
    results: {
      nullable: true,
      type: 'array',
      items: {
        type: 'integer'
      },
    },
  },
}

// LIST
export interface ListFactorizationInput {
  Querystring: {
    fetchToProcessOnly?: boolean
  }
}

export const listFactorizationSchema: RouteShorthandOptions = {
  schema: {
    querystring: {
      fetchToProcessOnly: {
        type: 'boolean',
        optionnal: true,
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          factorizations: {
            type: 'array',
            items: factorizationSchema,
          }
        }
      }
    }
  },
}

// POST
export interface CreateFactorizationInput {
  Params: {
    number: number
  }
}

export const createFactorizationSchema: RouteShorthandOptions = {
  schema: {
    params: {
      number: {
        type: 'integer',
        minimum: 1,
      },
    },
    response: {
      200: factorizationSchema,
    },
  },
}

// GET
export interface GetFactorizationInput {
  Params: {
    number: number
  }
}

export const getFactorizationSchema: RouteShorthandOptions = {
  schema: {
    params: {
      number: {
        type: 'integer',
        minimum: 1,
      },
    },
    response: {
      200: factorizationSchema,
    },
  },
}

// UPDATE
export interface UpdateFactorizationInput {
  Params: {
    number: number
  }
  Body: Factorization
}

export const updateFactorizationSchema: RouteShorthandOptions = {
  schema: {
    params: {
      number: {
        type: 'integer',
        minimum: 1,
      },
    },
    body: factorizationSchema,
    response: {
      200: factorizationSchema,
    },
  },
}
