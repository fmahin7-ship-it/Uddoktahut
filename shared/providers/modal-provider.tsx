"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export interface ModalState<TData = unknown> {
  type: string | null;
  data: TData | null;
}

interface ModalContextValue {
  modal: ModalState;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null, data: null });

  const openModal = useCallback((type: string, data: unknown = null) => {
    setModal({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, data: null });
  }, []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}
