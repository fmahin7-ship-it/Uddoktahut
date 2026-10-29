export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  /** null while an AI answer is still streaming. */
  timestamp: Date | null;
}

/** How ChatInput asks ChatInterface to change the message list. */
export type ChatOperation =
  | { type: "add"; message: ChatMessage }
  | { type: "update"; id: string; content?: string; timestamp?: Date };

/** One prior turn sent to the backend with each question. */
export interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

export interface ChatInputHandle {
  setMessage: (message: string) => void;
}

export interface ChatInterfaceHandle {
  handleSuggestedQuestion: (question: string) => void;
}
