import IMsg from "./message";
import IUser from "./user";

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
  isDeleted: boolean
}
export default IChat