export default interface IMsg {
  event: EventType,
  createdAt: Date,
  username: string,
  photoURL: string | null,
  message?: string,
}

export type EventType = 'connection' | 'message'