import { AxiosError, AxiosResponse } from "axios"
import { makeAutoObservable } from "mobx"
import $api, { API_URL } from "../http"
import IChat from "../types/chat"
import IUser from "../types/user"
import ApiError from "../types/api/apiError"

class ChatStore {
  currentChat: IChat | null = null
  // chats: IChat[] = [] // chats that have already been loaded
  
  constructor() {
    makeAutoObservable(this)
  }

  setCurrentChat(id: IChat | null) {
    this.currentChat = id
  }
  // setChats(chats: IChat[] | undefined) {
  //   this.chats = chats || []
  // }

  async findChatById(chatId: string) {
    try {
      return (await $api.get<IChat>(`${API_URL}/chat/${chatId}`)).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  async findUserById(uid: string) {
    try {
      return (await $api.get<IUser>(`${API_URL}/user/${uid}`)).data
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

  async findChatWithUser(user: IUser) {
    try {
      return (await $api.get<IChat>(`${API_URL}/chat/find/${user.uid}`)).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
}

export default new ChatStore