"use client";
import { createContext, useContext } from "react";

export const UserContext = createContext<any>(null);

export function useUser() {
  return useContext(UserContext); // user | null
}
