import { createContext, useState } from "react";
import { ChatContextProps, ChatContextProviderProps, Id } from "./types/ChatContextTypes";

export const ChatContext = createContext<ChatContextProps | null>(null)

const ChatContextProvider = ({children}: ChatContextProviderProps) => {
  const [id, setId] = useState<Id>(null)

  return (
    <ChatContext.Provider value={{
      id, setId
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider