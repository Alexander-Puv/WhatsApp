import { Types } from "mongoose"
import { IUserModel } from "../types/user"

export default class UserDto {
  username: string
  id: Types.ObjectId

  constructor(model: IUserModel) {
    this.username = model.username
    this.id = model._id
  }
}