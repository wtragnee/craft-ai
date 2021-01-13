import knex from 'knex'
import { Database } from '../Database'
import { fromTimestampToDate } from '../../utils/timestamp'

// We create a default database just to have some functions for sqlite mapping
// The parent function is the one we will test
export class DatabaseTest extends Database {
  constructor() {
    super({
      client: 'sqlite3',
      connection: {
        host: '',
        password: '',
        user: '',
        port: 0,
        database: '',
      }
    })
    this.db = knex({
      // We use sqlite3 to connect to in memory database
      client: 'sqlite3',
      connection: ':memory:',
      // We are forced to process responses, as sqlite return a timestamp
      // This is a hack, and should not be done in real project
      // I just do not have enough time to search for a proper way to fix this
      postProcessResponse: (response: any) => {
        if (!response) {
          return response
        }
        if (response instanceof Array) {
          return response.map((current) => this.processresponse(current))
        }
        return this.processresponse(response)
      }
    })
  }

  // Urg, I know, not a pure function, with different if doing the same
  private processresponse(response: any): any {
    if (response.creationTimestamp) {
      response.creationTimestamp = fromTimestampToDate(Math.round(response.creationTimestamp / 1000))
    }
    if (response.startOfProcessTimestamp) {
      response.startOfProcessTimestamp = fromTimestampToDate(Math.round(response.startOfProcessTimestamp / 1000))
    }
    if (response.endOfProcessTimestamp) {
      response.endOfProcessTimestamp = fromTimestampToDate(Math.round(response.endOfProcessTimestamp / 1000))
    }
    if (response.results) {
      response.results = response.results.split(',').map((value: string) => parseInt(value, 10))
    }
    return response
  }
}
