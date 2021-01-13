import { includes } from 'lodash'
import got, { Options, Method, RequestError } from 'got'

export interface IHTTPOptions {
  route: string
  qs?: {
    [key: string]: string | boolean | number
  }
  body?: any
}

interface ReqOption {
  uri: string
  options: Options
}

export class HttpConnector {
  protected baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || ''
  }

  public async get(reqOptions: IHTTPOptions): Promise<any> {
    const { uri, options }= this.formatOptions('GET', reqOptions)
    const res = await got(uri, options)
    return this.handleResponse(res)
  }

  public async put(reqOptions: IHTTPOptions): Promise<any> {
    const { uri, options }= this.formatOptions('PUT', reqOptions)
    const res = await got(uri, options)
    return this.handleResponse(res)
  }

  protected formatOptions(method: Method, options: IHTTPOptions): ReqOption {
    return {
      uri: `${this.baseUrl}${options.route}`,
      options: {
        method,
        json: includes(['POST', 'PUT', 'DELETE'], method) ? options.body : undefined,
        responseType: 'json',
        decompress: true,
        searchParams: options.qs,
      }
    }
  }

  protected handleResponse(res: unknown): any {
    if (this.isResponse(res)) {
      return res.body
    }
    if (res instanceof RequestError) {
      throw new Error(`Got error ${res.code} with message ${res.message}`)
    }
    throw new Error('Unknown error on request')
  }

  private isResponse(res: unknown): res is Response {
    if (res as Response) {
      return true
    }
    return false
  }
}
