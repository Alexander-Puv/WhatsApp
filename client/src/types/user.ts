import IChat from "./chat";

export default interface IUser {
  uid: string,
  username: string,
  createdAt: Date,
  photo: string,
  chats: IChat[]
}