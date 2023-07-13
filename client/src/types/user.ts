export default interface IUser {
  uid: string,
  username: string,
  createdAt: Date,
  photo?: string,
  description?: string,
  chats?: string[]
}