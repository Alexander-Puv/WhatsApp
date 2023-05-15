import React from "react";

export type storageItem = string | null

export interface AppContextProps {
  idInstance: storageItem,
  apiTokenInstance: storageItem,
  login: (idInstance: string, apiTokenInstance: string) => void,
  logout: () => void
}

export interface AppContextProviderProps {
  children: React.ReactNode
}