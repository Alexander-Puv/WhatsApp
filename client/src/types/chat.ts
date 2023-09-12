import IMsg from "./message";

type IChat = { // if chat
  isGroup: false,
  id: string,
  createdAt: string,
  members: string[],
  messages: (IMsg | string)[],
} | { // if group
  isGroup: true,
  id: string,
  createdAt: string,
  members: string[],
  messages: (IMsg | string)[],
  name: string,
  photo?: string,
  description?: string,
  isDeleted?: boolean
}
export default IChat