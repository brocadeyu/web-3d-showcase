// import axios from 'axios'
// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' },
// })
//https://bionicjulia.com/blog/axios-wrappers-react-typescript
import Axios, { type AxiosInstance } from 'axios'
type HttpHeaders = {
  [key: string]: string
}

type RequestConfig = {
  headers: HttpHeaders
}

interface IHttpClient {
  get<TResponse>(path: string): Promise<TResponse>
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig,
  ): Promise<TResponse>
}

export default class HttpClient implements IHttpClient {
  private static client: AxiosInstance
  protected constructor() {
    if (!HttpClient.client) {
      HttpClient.client = HttpClient.createAxiosClient()
    }
  }
  private static createAxiosClient(): AxiosInstance {
    console.log('create axios')

    return Axios.create({
      baseURL: import.meta.env.VITE_APP_TITLE,
      timeout: 5 * 1000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  async get<TResponse>(path: string) {
    return (await HttpClient.client.get<TResponse>(path)) as TResponse
  }
  async post<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig) {
    return (await HttpClient.client.post<TResponse>(path, payload, config)) as TResponse
  }
}
