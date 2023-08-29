export default interface IMsg {
  id: string,
  createdAt: Date,
  senderId: string,
  content: string,
  isRead: boolean,
  chatId: string
}