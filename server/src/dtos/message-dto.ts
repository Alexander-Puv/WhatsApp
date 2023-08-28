import { IMsgModel } from "../types/message"

export default class MessageDto {
  id: string
  createdAt: Date
  senderId: string
  content: string
  isRead: boolean
  chatId: string

  constructor(model: IMsgModel) {
    this.id = model._id
    this.senderId = model.senderId.toString()
    this.createdAt = model.createdAt
    this.content = model.content
    this.isRead = model.isRead
    this.chatId = model.chatId.toString()
  }
}