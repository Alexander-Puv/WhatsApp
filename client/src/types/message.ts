export default interface IMsg {
  id: string,
  createdAt: string,
  senderId: string,
  content: string,
  isRead: boolean,
  chatId: string
}