"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type SubmitHandler = (() => void | Promise<void>) | null;

interface StepperContextValue {
  submitForm: SubmitHandler;
  setSubmitForm: Dispatch<SetStateAction<SubmitHandler>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isFullyComplete: boolean;
  setIsFullyComplete: Dispatch<SetStateAction<boolean>>;
}

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

export function StepperProvider({ children }: { children: ReactNode }) {
  const [submitForm, setSubmitForm] = useState<SubmitHandler>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullyComplete, setIsFullyComplete] = useState(false);

  return (
    <StepperContext.Provider
      value={{
        submitForm,
        setSubmitForm,
        isLoading,
        setIsLoading,
        isFullyComplete,
        setIsFullyComplete,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepper(): StepperContextValue {
  const context = useContext(StepperContext);
  if (!context) throw new Error("useStepper must be used within a StepperProvider");
  return context;
}
