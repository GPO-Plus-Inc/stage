"use client";
import { UserContext } from "./userContext";

type UserProviderProps = {
  user: any | null;
  children: React.ReactNode;
};


export default function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

