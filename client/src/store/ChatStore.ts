import { makeAutoObservable } from "mobx"

class ChatStore {
  id: string | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  setId(id: string | null) {
    this.id = id
  }
}

export default new ChatStore