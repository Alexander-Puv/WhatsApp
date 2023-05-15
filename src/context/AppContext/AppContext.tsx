import { createContext, useState } from "react";
import { AppContextProps, AppContextProviderProps } from "./types/AppContextTypes";

export const AppContext = createContext<AppContextProps | null>(null)

const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [idInstance, setIdInstance] = useState(localStorage.getItem('idInstance'))
  const [apiTokenInstance, setApiTokenInstance] = useState(localStorage.getItem('apiTokenInstance'))

  const login = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance)
    setApiTokenInstance(apiTokenInstance)

    localStorage.setItem('idInstance', idInstance)
    localStorage.setItem('apiTokenInstance', apiTokenInstance)
  }

  const logout = () => {
    setIdInstance(null)
    setApiTokenInstance(null)

    localStorage.removeItem('idInstance')
    localStorage.removeItem('apiTokenInstance')
  }

  return (
    <AppContext.Provider value={{
      idInstance, apiTokenInstance,
      login, logout
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider