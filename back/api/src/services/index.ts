import { config } from './config'
import { Database } from './Database'

export interface IServices {
  config: typeof config
  database: Database
}

export const initServices = async (): Promise<IServices> => {
  const database = new Database(config.db)
  await database.init()

  return {
    config,
    database,
  }
}


