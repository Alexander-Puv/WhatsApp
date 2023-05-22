import { createContext, useState } from "react";
import { AppContextProps, AppContextProviderProps } from "./types/AppContextTypes";

export const AppContext = createContext<AppContextProps | null>(null)

const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [username, setUsername] = useState(localStorage.getItem('username'))

  // const signup = () => {

  // }

  const login = (username: string, password: string) => {
    setUsername(username)

    localStorage.setItem('username', username)
  }

  const logout = () => {
    localStorage.removeItem('username')
  }

  return (
    <AppContext.Provider value={{
      username,
      login, logout
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider