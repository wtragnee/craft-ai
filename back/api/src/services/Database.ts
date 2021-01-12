import knex from 'knex'
import { Factorization } from '../http/controllers/Factorization/FactorizationHandler'
import { fromDateToTimestamp, fromTimestampToDate } from '../utils/timestamp'

export interface DatabaseFactorization {
  number: number
  creationTimestamp: Date
  startOfProcessTimestamp: Date | null
  endOfProcessTimestamp: Date | null
  results: number[] | null
}

export interface IDatabaseConfig {
  client: string
  connection: {
    user: string
    password: string
    database: string
    host: string
    port: number
  }
}

export class Database {
  protected db: knex
  static TABLES = {
    FACTORIZATION: 'factorizations'
  }

  constructor(config: IDatabaseConfig) {
    this.db = knex(config)
  }

  public async init() {
    if (await this.db.schema.hasTable(Database.TABLES.FACTORIZATION)) {
      return
    }
    await this.db.schema.createTable(Database.TABLES.FACTORIZATION, (table) => {
      table.integer('number').unique()
      table.timestamp('creationTimestamp')
      table.timestamp('startOfProcessTimestamp')
      table.timestamp('endOfProcessTimestamp')
      table.specificType('results', 'INT[]')
      return table
    })
  }
  
  public async createNewFactorization(factorization: Factorization) {
    const dbObj = this.mapToDb(factorization)
    return this.db(Database.TABLES.FACTORIZATION).insert(dbObj).onConflict('number').ignore()
  }

  public async listAllFactorizations(): Promise<Factorization[]> {
    const factorizations = await this.db(Database.TABLES.FACTORIZATION).select('*')
    return factorizations.map((current) => this.mapFromDb(current))
  }

  public async listToProcessedFactorizations(): Promise<Factorization[]> {
    const factorizations = await this.db(Database.TABLES.FACTORIZATION).select('*').whereNull('startOfProcessTimestamp')
    return factorizations.map((current) => this.mapFromDb(current))
  }

  public async updateFactorization(factorization: Factorization) {
    return this.db(Database.TABLES.FACTORIZATION).update(this.mapToDb(factorization)).where('number', '=', factorization.number)
  }

  public async getFactorization(number: number): Promise<Factorization> {
    const factorization: DatabaseFactorization = await this.db(Database.TABLES.FACTORIZATION).select('*').where('number', '=', number).first()
    return this.mapFromDb(factorization)
  }

  private mapFromDb(dbObj: DatabaseFactorization): Factorization {
    return {
      number: dbObj.number,
      creationTimestamp: fromDateToTimestamp(dbObj.creationTimestamp),
      startOfProcessTimestamp: dbObj.startOfProcessTimestamp ? fromDateToTimestamp(dbObj.startOfProcessTimestamp) : null,
      endOfProcessTimestamp: dbObj.endOfProcessTimestamp ? fromDateToTimestamp(dbObj.endOfProcessTimestamp) : null,
      results: dbObj.results,
    }
  }

  private mapToDb(input: Factorization): DatabaseFactorization {
    return {
      number: input.number,
      creationTimestamp: fromTimestampToDate(input.creationTimestamp),
      startOfProcessTimestamp: input.startOfProcessTimestamp ? fromTimestampToDate(input.startOfProcessTimestamp) : null,
      endOfProcessTimestamp: input.endOfProcessTimestamp ? fromTimestampToDate(input.endOfProcessTimestamp) : null,
      results: input.results,
    }
  }
}