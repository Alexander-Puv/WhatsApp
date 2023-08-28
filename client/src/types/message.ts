export default interface IMsg {
  createdAt: Date,
  senderId: string,
  content: string,
  isRead: boolean
}