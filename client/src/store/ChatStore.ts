import { AxiosResponse } from "axios"
import { makeAutoObservable } from "mobx"
import $api, { API_URL } from "../http"
import IChat from "../types/chat"
import IUser from "../types/user"

class ChatStore {
  id: string | null = null
  chats: string[] = []
  
  constructor() {
    makeAutoObservable(this)
  }

  setId(id: string | null) {
    this.id = id
  }
  setChats(chats: string[]) {
    this.chats = chats
  }

  async findChat(chatId: string) {
    const response: AxiosResponse<IChat> = await $api.get(`${API_URL}/chat/${chatId}`)
    return response.data
  }

  async findUser(uid: string) {
    const response: AxiosResponse<IUser> = await $api.get(`${API_URL}/user/${uid}`)
    return response.data
  }
}

export default new ChatStore