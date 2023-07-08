import axios, { AxiosResponse } from "axios"
import { makeAutoObservable, toJS } from "mobx"
import $api, { API_URL } from "../http"
import IChat from "../types/chat"
import IUser from "../types/user"
import AppStore from "./AppStore"

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

  async findChatById(chatId: string) {
    const response: AxiosResponse<IChat> = await $api.get(`${API_URL}/chat/${chatId}`)
    return response.data
  }

  async findUserById(uid: string) {
    const response: AxiosResponse<IUser> = await $api.get(`${API_URL}/user/${uid}`)
    return response.data
  }

  async findChat(name: string): Promise<[IUser | undefined, IChat[] | undefined]> {
    const user: AxiosResponse<IUser> = await $api.get(`${API_URL}/user/?username=${name}`)
    const group: AxiosResponse<IChat[]> = await $api.get(`${API_URL}/chat/group/find/?name=${name}`)

    const userData = user.data? user.data : undefined
    const groupData = group.data.length ? group.data : undefined

    return [userData, groupData]
  }

  async findChatWithUser(user: IUser) {
    const chat: AxiosResponse<IChat> = await $api.get(`${API_URL}/chat/find/${user.uid}`)
    return chat.data
  }
}

export default new ChatStore