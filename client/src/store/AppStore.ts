import axios, { AxiosError } from "axios"
import { makeAutoObservable } from "mobx"
import ApiError from "../types/api/apiError"
import UserData from "../types/api/userData"

class AppStore {
  accessToken: string | null = localStorage.getItem('accessToken')

  constructor() {
    makeAutoObservable(this)
  }

  async register(username: string, password: string) {
    try {
      const response = await axios.post<UserData>('http://localhost:5000/api/auth/register', {
        username,
        password
      })
      localStorage.setItem('accessToken', response.data.accessToken)
      this.accessToken = response.data.accessToken
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
  async login(username: string, password: string) {
    // this.username = username
    // localStorage.setItem('accessToken', )
  }
  async logout () {
    // this.username = null
    // localStorage.removeItem('accessToken')
  }
}

export default new AppStore