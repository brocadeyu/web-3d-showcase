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

    const axiosInstance = Axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: 5 * 1000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 请求拦截器
    axiosInstance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        // 例如：添加 token
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    axiosInstance.interceptors.response.use(
      (response) => {
        // 对响应数据做点什么
        return response.data
      },
      (error) => {
        // 对响应错误做点什么
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // 未授权，可以在这里处理登出逻辑
              break
            case 403:
              // 禁止访问
              break
            case 404:
              // 未找到
              break
            case 500:
              // 服务器错误
              break
          }
        }
        return Promise.reject(error)
      },
    )

    return axiosInstance
  }
  async get<TResponse>(path: string) {
    return (await HttpClient.client.get<TResponse>(path)) as TResponse
  }
  async post<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig) {
    if (config) {
      return (await HttpClient.client.post<TResponse>(path, payload, config)) as TResponse
    }
    return (await HttpClient.client.post<TResponse>(path, payload)) as TResponse
  }
}
