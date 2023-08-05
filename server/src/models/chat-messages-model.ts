import { Schema, model } from "mongoose"
import { IChatMsgsModel } from "../types/message"

const ChatMessagesSchema = new Schema<IChatMsgsModel>({
  messages: [{
    content: {type: String, required: true},
    senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now},
    // isRead: {type: Boolean, default: false}
  }]
})

export default model<IChatMsgsModel>('ChatMessages', ChatMessagesSchema)