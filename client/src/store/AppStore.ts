import axios, { AxiosError, AxiosResponse } from "axios"
import { makeAutoObservable } from "mobx"
import $api, { API_URL } from "../http"
import ApiError from "../types/api/apiError"
import UserData from "../types/api/userData"
import IUser from "../types/user"
import ChatStore from "./ChatStore"

class AppStore {
  isAuth = false
  isLoading = true
  user = {} as IUser

  constructor() {
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this.isAuth = bool
  }
  setIsLoading(bool: boolean) {
    this.isLoading = bool
  }
  setUser(user: IUser) {
    this.user = user
  }

  async register(username: string, password: string) {
    try {
      const response: AxiosResponse<UserData> = await $api.post(`/auth/register`, {username, password})
      localStorage.setItem('token', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
  async login(username: string, password: string) {
    try {
      const response: AxiosResponse<UserData> = await $api.post(`/auth/login`, {username, password})
      localStorage.setItem('token', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
      ChatStore.setChats(response.data.user.chats)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
  async logout () {
    try {
      const response: AxiosResponse<UserData> = await $api.post(`/auth/logout`)
      localStorage.removeItem('token')
      this.setIsAuth(false)
      this.setUser(response.data.user)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async checkAuth() {
    this.setIsLoading(true)
    try {
      const response = await axios.get<UserData>(`${API_URL}/auth/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.user)
      ChatStore.setChats(response.data.user.chats)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    } finally {
      this.setIsLoading(false)
    }
  }
}

export default new AppStore