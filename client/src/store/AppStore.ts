import { makeAutoObservable } from "mobx"

class AppStore {
  username: string | null = localStorage.getItem('username')

  constructor() {
    makeAutoObservable(this)
  }

  signup(username: string, password: string) {
    this.username = username
    localStorage.setItem('username', username)
  }
  login(username: string, password: string) {
    this.username = username
    localStorage.setItem('username', username)
  }
  logout() {
    this.username = null
    localStorage.removeItem('username')
  }
}

export default new AppStore