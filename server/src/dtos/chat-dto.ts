import { IChatModel } from "../types/chat"
import IMsg from "../types/message"

export default class ChatDto {
  isGroup: boolean
  id: string
  createdAt: Date
  members: string[]
  messages: IMsg[]
  name?: string
  photo?: string
  description?: string
  isDeleted?: boolean

  constructor(model: IChatModel) {
    this.id = model._id
    this.createdAt = new Date(model.createdAt)
    this.members = model.members
    this.messages = model.messages.map((msg) => ({
      ...msg,
      id: msg._id,
      senderId: msg.senderId.toString(),
      chatId: msg.chatId.toString()
    }));
    this.isGroup = model.isGroup
    this.name = model.name
    this.photo = model.photo
    this.description = model.description
    this.isDeleted = model.isDeleted
  }
}