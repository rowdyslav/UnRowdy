import axios from 'axios'

type UnauthorizedHandler = () => boolean | void

interface ApiClientConfig {
  getAccessToken?: () => string | null
  onUnauthorized?: UnauthorizedHandler
}

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiClientConfig: ApiClientConfig = {}
let isHandlingUnauthorized = false

export const configureApiClient = (config: ApiClientConfig) => {
  apiClientConfig.getAccessToken = config.getAccessToken
  apiClientConfig.onUnauthorized = config.onUnauthorized
}

api.interceptors.request.use(config => {
  const token = apiClientConfig.getAccessToken?.()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const handleUnauthorized = () => {
  if (isHandlingUnauthorized || !apiClientConfig.onUnauthorized) {
    return
  }

  isHandlingUnauthorized = true
  const shouldReleaseLock = apiClientConfig.onUnauthorized()

  if (shouldReleaseLock) {
    isHandlingUnauthorized = false
  }
}

api.interceptors.response.use(
  response => response,
  error => {
    const hasAuthHeader = Boolean(error.config?.headers?.Authorization)

    if (error.response?.status === 401 && hasAuthHeader) {
      handleUnauthorized()
    }

    return Promise.reject(error)
  },
)
