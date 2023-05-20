import React from "react";

export interface AppContextProps {
  data: string | null
  login: (idInstance: string, apiTokenInstance: string) => void,
  logout: () => void
}

export interface AppContextProviderProps {
  children: React.ReactNode
}