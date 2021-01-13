import { IServices } from '../../../services'
import { fromDateToTimestamp } from '../../../utils/timestamp'

export interface Factorization {
  number: number
  creationTimestamp: number
  startOfProcessTimestamp: number | null
  endOfProcessTimestamp: number | null
  results: number[] | null
}

export class FactorizationHandler {
  protected services: IServices

  constructor(services: IServices) {
    this.services = services
  }

  public async createFactorization(number: number): Promise<Factorization> {
    const factorization: Factorization = {
      number,
      creationTimestamp: fromDateToTimestamp(new Date()),
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    await this.services.database.createNewFactorization(factorization)
    return factorization
  }

  public async getFactorization(value: number): Promise<Factorization> {
    const factorization = await this.services.database.getFactorization(value)
    return factorization
  }

  public async listFactorization(fetchToProcessOnly: boolean): Promise<{ factorizations: Factorization[] }> {
    let factorizations
    if (fetchToProcessOnly) {
      factorizations = await this.services.database.listToProcessedFactorizations()
    } else {
      factorizations = await this.services.database.listAllFactorizations()
    }
    return {
      factorizations
    }
  }

  public async updateFactorization(factorization: Factorization): Promise<Factorization> {
    await this.services.database.updateFactorization(factorization)
    return factorization
  }
}
