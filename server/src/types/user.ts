import { Document, Types } from "mongoose";
import IChat, { IChatModel } from "./chat";

export default interface IUser {
  uid: string,
  username: string,
  createdAt: Date,
  photo?: string,
  description?: string,
  chats?: IChat[]
}

export interface IUserModel extends Document {
  username: string,
  password: string,
  createdAt: Date,
  photo?: string,
  description: string,
  chats: Types.Array<IChatModel['_id']>,
}