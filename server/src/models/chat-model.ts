import { Schema, model } from "mongoose"
import { IChatModel } from "../types/chat"

const ChatSchema = new Schema<IChatModel>({
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  createdAt: {type: Date, default: Date.now},
  messages: [{
    content: {type: String, required: true},
    senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now},
  }],
  // for groups
  isGroup: { type: Boolean, default: false },
  name: {type: String, required: function() {return this.isGroup}},
  photo: String,
  description: String,
  isDeleted: Boolean
})

export default model<IChatModel>('Chat', ChatSchema)