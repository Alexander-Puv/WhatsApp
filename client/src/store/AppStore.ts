import axios, { AxiosError } from "axios"
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
  setUser(user?: IUser) {
    this.user = user || {} as IUser
  }

  // auth
  async register(username: string, password: string) {
    try {
      const {data} = await $api.post<UserData>(`/auth/register`, {username, password})
      localStorage.setItem('token', data.accessToken)
      this.setIsAuth(true)
      this.setUser(data.user)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
  async login(username: string, password: string) {
    try {
      const {data} = await $api.post<UserData>(`/auth/login`, {username, password})
      localStorage.setItem('token', data.accessToken)
      this.setIsAuth(true)
      this.setUser(data.user)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
  async logout () {
    try {
      await $api.post(`/auth/logout`)
      localStorage.removeItem('token')
      this.setIsAuth(false)
      this.setUser()
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async checkAuth() {
    try {
      const {data} = await axios.get<UserData>(`${API_URL}/auth/refresh`, {withCredentials: true})
      localStorage.setItem('token', data.accessToken)

      this.setIsAuth(true)
      this.setUser(data.user)

      ChatStore.setStringChats(data.user?.chats || [])
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    } finally {
      this.setIsLoading(false)
    }
  }

  // profile

  async changePhoto(photo: File) {
    const formData = new FormData()
    formData.append('photo', photo)
    
    try {
      const {data} = await $api.put<IUser>(`/profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.setUser(data)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async changeDescription(description: string) {
    try {
      const {data} = await $api.put<IUser>(`/profile/description`, {description})
      this.setUser(data)
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
}

export default new AppStore