import axios from "axios"
import UserData from "../types/api/userData"

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(config => config,
  (async err => {
    const originalRequest = err.config
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<UserData>(`${API_URL}/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        throw new Error('You are not authorized')
      }
    }
    throw err
}))

export default $api