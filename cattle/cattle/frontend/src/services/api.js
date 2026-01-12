import axios from 'axios'
import { getToken, clearAuth } from './auth'

const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

const api = axios.create({ baseURL: base })

// Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers = config.headers || {}, config.headers.Authorization = `Bearer ${token}`
  return config
})

// Optional: handle 401 responses globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err?.response?.status === 401) {
      // token invalid or expired, notify UI and clear local auth
      window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { message: 'Your session has expired. Please sign in again.' } }))
      clearAuth()
      // Let the app handle redirects via authChanged event
      window.dispatchEvent(new Event('authChanged'))
    }
    return Promise.reject(err)
  }
)

export default api
