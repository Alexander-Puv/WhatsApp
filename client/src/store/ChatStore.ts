import { AxiosError, AxiosResponse } from "axios"
import { makeAutoObservable } from "mobx"
import $api, { API_URL } from "../http"
import IChat from "../types/chat"
import IUser from "../types/user"
import ApiError from "../types/api/apiError"
import IMsg from "../types/message"

class ChatStore {
  currentChat: IChat | null = null
  member: IUser | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  setCurrentChat(chat: IChat | null) {
    this.currentChat = chat
  }
  setMember(member: IUser | null) {
    this.member = member
  }

  // chats

    // post
  async createChat(receiverId: string) {
    try {
      return (await $api.post<IChat>(`${API_URL}/chat`, {receiverId})).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

    // get
  async findChatById(chatId: string) {
    try {
      return (await $api.get<IChat>(`${API_URL}/chat/${chatId}`)).data
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

  // users

    // get
  async findUserById(uid: string) {
    try {
      return (await $api.get<IUser>(`${API_URL}/user/${uid}`)).data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

  // messages

    // post
  async sendMsg(content: string, chatId: string) {
    try {
      const {data} = await $api.post<IMsg>(`${API_URL}/message`, {content, chatId})
      this.currentChat?.messages.push(data)
      return data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }

    // get
  async findMsgById(id: string) {
    try {
      const {data} = await $api.get<IMsg>(`${API_URL}/message/${id}`)
      const index = this.currentChat?.messages.indexOf(data.id) as number
      this.currentChat?.messages.splice(index, 1, data)
      return data
    } catch (e) {
      throw (e as AxiosError<ApiError>).response?.data
    }
  }
}

export default new ChatStore