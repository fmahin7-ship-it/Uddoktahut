"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { SessionUser } from "@/shared/api/types";

/**
 * Empty placeholder used only if a layout forgets to pass the signed-in user.
 * Deliberately contains no real person's data.
 */
export const EMPTY_USER: SessionUser = {
  name: "",
  email: null,
  phoneNumber: null,
  onboarded: false,
};

interface UserContextValue {
  user: SessionUser;
  setUser: Dispatch<SetStateAction<SessionUser>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: SessionUser | null;
}) {
  const [user, setUser] = useState<SessionUser>(initialData ?? EMPTY_USER);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
