export default interface IMsg {
  event: EventType,
  createdAt: Date,
  uid: string,
  username: string,
  photoURL: string | null,
  message?: string,
  // isRead: boolean
}

export type EventType = 'connection' | 'message'