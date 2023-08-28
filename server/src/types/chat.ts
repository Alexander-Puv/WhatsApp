import { Document, Types } from "mongoose";
import IMsg, { IMsgModel } from "./message";
import { IUserModel } from "./user";

type IChat = { // if chat
  isGroup: false,
  id: string,
  createdAt: Date,
  members: string[],
  messages: string[],
} | { // if group
  isGroup: true,
  id: string,
  createdAt: Date,
  members: string[],
  messages: string[],
  name: string,
  photo?: string,
  description?: string,
  isDeleted?: boolean
}
export default IChat


export interface IChatModel extends Document {
  members: Types.Array<IUserModel['_id']>,
  createdAt: Date,
  messages: Types.Array<IMsgModel['_id']>,
  // if group
  isGroup: boolean,
  name?: string,
  photo?: string,
  description?: string,
  isDeleted?: boolean
}