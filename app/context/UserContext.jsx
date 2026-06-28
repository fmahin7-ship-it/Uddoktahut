"use client";

import { DEFAULT_TEMPLATE } from "@/constants/templates";
import { createContext, useContext, useState } from "react";

/** Dev/fallback only — production uses UserProvider initialData from layout SSR. */
const initialState = {
  name: "Sumaiya Ahmed",
  email: "ahmedahona@gmail.com",
  phoneNumber: "+8801920190520",
  onboarded: true,
  role: 2,
  isActive: false,
  template_name: DEFAULT_TEMPLATE,
  storeName: "shoporia",
  storeUrl: "shoporia.uddoktahut.com",
  planSlug: "trial",
  planName: "Free Trial",
  includesAi: false,
  maxProducts: 20,
  productCount: 0,
  productsRemaining: 20,
  aiTokenLimitMonthly: 0,
  aiTokensUsed: 0,
  aiTokensRemaining: 0,
  subscriptionStatus: "trialing",
};

const UserContext = createContext();

const UserProvider = ({ children, initialData }) => {
  const data = initialData || initialState;
  const [user, setUser] = useState(data);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
};

export { UserProvider, useUser, initialState };
