import { Schema, model } from "mongoose"
import { IChatModel } from "../types/chat"

const ChatSchema = new Schema<IChatModel>({
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  createdAt: {type: Date, default: Date.now},
  messages: [{type: Schema.Types.ObjectId, ref: 'ChatMessages'}],
  // for groups
  isGroup: { type: Boolean, default: false },
  name: {type: String, required: function() {return this.isGroup}},
  photo: String,
  description: String,
  isDeleted: Boolean
})

export default model<IChatModel>('Chat', ChatSchema)