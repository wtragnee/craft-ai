import { HttpConnector } from '../connector/HttpConnector'

export interface Factorization {
  number: number
  creationTimestamp: number
  startOfProcessTimestamp: number | null
  endOfProcessTimestamp: number | null
  results: number[] | null
}

export class HttpService {
  protected client: HttpConnector

  constructor(baseUrl: string) {
    this.client = new HttpConnector(baseUrl)
  }

  public async getFactorizationsToProcess(): Promise<Factorization[]> {
    const options = {
      route: '/api/v1/factorization',
      qs: {
        fetchToProcessOnly: true
      },
    }
    const body = await this.client.get(options)
    return body.factorizations
  }

  public async updateFacorization(factorization: Factorization) {
    const options = {
      route: `/api/v1/factorization/${factorization.number}`,
      body: factorization,
    }
    return this.client.put(options)
  }
}
