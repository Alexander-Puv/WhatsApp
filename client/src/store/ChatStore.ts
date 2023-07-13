import { AxiosError, AxiosResponse } from "axios"
import { makeAutoObservable } from "mobx"
import $api, { API_URL } from "../http"
import IChat from "../types/chat"
import IUser from "../types/user"
import ApiError from "../types/api/apiError"

class ChatStore {
  id: string | null = null
  chats: string[] = []
  
  constructor() {
    makeAutoObservable(this)
  }

  setId(id: string | null) {
    this.id = id
  }
  setChats(chats: string[] | undefined) {
    this.chats = chats || []
  }

  async findChatById(chatId: string): Promise<IChat> {
    try {
      return (await $api.get(`${API_URL}/chat/${chatId}`)).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async findUserById(uid: string): Promise<IUser> {
    try {
      return (await $api.get(`${API_URL}/user/${uid}`)).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async findChat(name: string): Promise<[IUser | undefined, IChat[] | undefined]> {
    try {
      const user: AxiosResponse<IUser> = await $api.get(`${API_URL}/user/?username=${name}`)
      const group: AxiosResponse<IChat[]> = await $api.get(`${API_URL}/chat/group/find/?name=${name}`)
  
      const userData = user.data? user.data : undefined
      const groupData = group.data.length ? group.data : undefined
  
      return [userData, groupData]
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async findChatWithUser(user: IUser): Promise<IChat> {
    try {
      return (await $api.get(`${API_URL}/chat/find/${user.uid}`)).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
}

export default new ChatStore