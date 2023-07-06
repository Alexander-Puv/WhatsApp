import { Document, Types } from "mongoose";

export default interface IMsg {
  // event: EventType, // no?
  createdAt: Date,
  senderId: string,
  content?: string,
  // isRead: boolean
}
// export type EventType = 'connection-to-group' | 'message' | 'first-message'

export interface IMsgModel extends Document {
  content: string,
  senderId: Types.ObjectId,
  createdAt: Date
}