import IMsg from "./message";

type IChat = { // if chat
  isGroup: false,
  id: string,
  createdAt: Date,
  members: string[],
  messages: IMsg[],
} | { // if group
  isGroup: true,
  id: string,
  createdAt: Date,
  members: string[],
  messages: IMsg[],
  name: string,
  photo?: string,
  description?: string,
  isDeleted?: boolean
}
export default IChat