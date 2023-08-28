import { Document, Types } from "mongoose";

export default interface IMsg {
  id: string,
  createdAt: Date,
  senderId: string,
  content: string,
  isRead: boolean,
  chatId: string
}

export interface IMsgModel extends Document {
  content: string,
  senderId: Types.ObjectId,
  createdAt: Date,
  isRead: boolean,
  chatId: Types.ObjectId
}