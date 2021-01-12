import { IServices } from '../index'
import { DatabaseTest } from './Database'

export const services: IServices = {
  config: {
    port: 3000,
    env: 'test',
    db: {
      client: 'sqlite3',
      connection: {
        host: '',
        password: '',
        user: '',
        port: 0,
        database: '',
      },
    },
  },
  database: new DatabaseTest(),
}
