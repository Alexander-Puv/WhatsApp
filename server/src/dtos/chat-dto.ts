import { Types } from "mongoose"
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
  isDeleted?: boolean

  constructor(model: IChatModel) {
    this.id = model.id
    this.createdAt = new Date(model.createdAt)
    this.members = model.members
    this.messages = model.messages.map((msg) => ({
      content: msg.content,
      senderId: msg.senderId.toString(),
      createdAt: msg.createdAt,
    }));
    this.isGroup = model.isGroup
    this.name = model.name
    this.photo = model.photo
    this.isDeleted = model.isDeleted
  }
}