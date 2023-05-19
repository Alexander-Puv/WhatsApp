import { createContext, useState } from "react";
import { AppContextProps, AppContextProviderProps } from "./types/AppContextTypes";

export const AppContext = createContext<AppContextProps | null>(null)

const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [data, setData] = useState(localStorage.getItem('data'))

  const login = (idInstance: string, apiTokenInstance: string) => {
    fetch(`https://api.green-api.com/waInstance${idInstance}/GetSettings/${apiTokenInstance}`)
    .then(response => response.json())
    .then((data) => {
      setData(JSON.stringify(data))
      localStorage.setItem('data', JSON.stringify(data))
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const logout = () => {
    localStorage.removeItem('data')
  }

  return (
    <AppContext.Provider value={{
      data,
      login, logout
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider