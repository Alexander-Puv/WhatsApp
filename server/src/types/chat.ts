import { Document, Types } from "mongoose";
import IMsg, { IMsgModel } from "./message";
import IUser, { IUserModel } from "./user";

type IChat = { // if chat
  isGroup: false,
  id: string,
  createdAt: Date,
  users: IUser[],
  messages: IMsg[],
} | { // if group
  isGroup: true,
  id: string,
  createdAt: Date,
  users: IUser[],
  messages: IMsg[],
  name: string,
  photo: string,
}
export default IChat


export interface IChatModel extends Document {
  members: [Types.Array<IUserModel['_id']>],
  createdAt: Date,
  messages: IMsgModel[],
  // if group
  isGroup: boolean,
  name?: string,
  photo?: string,
}