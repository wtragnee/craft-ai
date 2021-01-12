import { config } from './config'
import { HttpService } from './HttpService'

export interface IServices {
  config: typeof config
  http: HttpService
}

export const initServices = async (): Promise<IServices> => {
  return {
    config,
    http: new HttpService(config.apiHost),
  }
}


