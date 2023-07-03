export default interface IMsg {
  // event: EventType, // no?
  createdAt: Date,
  senderId: string,
  content: string,
  // isRead: boolean
}