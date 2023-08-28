import { Schema, model } from "mongoose"
import { IMsgModel } from "../types/message"

const MessageSchema = new Schema<IMsgModel>({
  content: {type: String, required: true},
  senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, default: Date.now},
  isRead: {type: Boolean, default: false},
  chatId: {type: Schema.Types.ObjectId, ref: 'Chat', required: true}
})

export default model<IMsgModel>('Message', MessageSchema)