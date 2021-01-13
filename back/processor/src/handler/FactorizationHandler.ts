import { IServices } from '../services'
import { Factorization } from '../services/HttpService'
import { factors } from '../utils/factorization'
import { getCurrentTimestamp } from '../utils/timestamp'
import { map } from 'bluebird'

export class FactorizationHandler {
  protected services: IServices

  constructor(services: IServices) {
    this.services = services
  }

  public async handle() {
    const toProcess = await this.services.http.getFactorizationsToProcess()

    if (!toProcess.length) {
      console.log('Nothing to process')
    }

    await map(toProcess, (factorization) => this.compute(factorization))

    console.log('End of process')
  }

  protected async compute(factorization: Factorization) {
    console.log(`Starting to process ${factorization.number}`)
    const newFactorization = await this.setStartComputation(factorization)
    const results = factors(factorization.number)
    await this.setEndComputation(newFactorization, results)
    console.log(`Ending of process ${factorization.number}`)
  }

  protected async setStartComputation(factorization: Factorization): Promise<Factorization> {
    const newFactorization = {
      ...factorization,
      startOfProcessTimestamp: getCurrentTimestamp(),
    }
    await this.services.http.updateFacorization(newFactorization)
    return newFactorization
  }

  protected async setEndComputation(factorization: Factorization, results: number[]) {
    return this.services.http.updateFacorization({
      ...factorization,
      endOfProcessTimestamp: getCurrentTimestamp(),
      results,
    })
  }
}
