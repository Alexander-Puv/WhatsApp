import { Schema, model } from "mongoose"
import { IUserModel } from "../types/user"

const UserSchema = new Schema<IUserModel>({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  photo: String,
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
})

export default model<IUserModel>('User', UserSchema)