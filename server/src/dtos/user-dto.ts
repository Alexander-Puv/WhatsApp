import { Types } from "mongoose"
import { IUserModel } from "../types/user"
import IChat from "../types/chat"

export default class UserDto {
  username: string
  uid: Types.ObjectId
  createdAt: Date
  photo: string | null
  chats: IChat[]

  constructor(model: IUserModel) {
    this.username = model.username
    this.uid = model._id
    this.createdAt = model.createdAt
    this.photo = model.photo
    this.chats = model.chats
  }
}