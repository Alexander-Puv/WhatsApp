import { Document, Types } from "mongoose";

export default interface IMsg {
  createdAt: Date,
  senderId: string,
  content?: string,
  // isRead: boolean
}

export interface IChatMsgs {
  createdAt: Date,
  senderId: string,
  content?: string,
  // isRead: boolean
}

export interface IChatMsgsModel extends Document {
  messages: {
    content: string,
    senderId: Types.ObjectId,
    createdAt: Date
    // isRead: boolean
  }[]
}