import React from "react";

export interface ChatContextProps {
  id: Id,
  setId: (id: Id) => void
}

// export interface IChosenChat {
//   id: string
//   username: string,
//   photo?: string,
// }
export type Id = string | null

export interface ChatContextProviderProps {
  children: React.ReactNode
}