import axios from 'axios'
import { config } from './config'

export class HttpService {
  constructor() {
    this.baseUrl = config.host
  }

  async createFactorization(value) {
    return axios.post(`${this.baseUrl}/api/v1/factorization/${value}`)
  }

  async fetchFactorization(value) {
    const response = await axios.get(`${this.baseUrl}/api/v1/factorization/${value}`)
    return response
  }
}
