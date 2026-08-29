const CHAT_SESSION_KEY = "uddoktahut:analytics-chat";

const getWelcomeMessage = () => ({
  id: "welcome",
  type: "ai",
  content:
    "👋 Hi! I'm your AI business analyst. Ask me anything about your products, sales trends, or seasonal insights. For example: 'Which products will shine in winter?' or 'What's my best selling category?'",
  timestamp: new Date(),
});

const loadChatMessages = () => {
  if (typeof window === "undefined") {
    return [getWelcomeMessage()];
  }

  try {
    const raw = sessionStorage.getItem(CHAT_SESSION_KEY);
    if (!raw) {
      return [getWelcomeMessage()];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [getWelcomeMessage()];
    }

    return parsed.map((message) => ({
      ...message,
      timestamp: message.timestamp ? new Date(message.timestamp) : null,
    }));
  } catch {
    return [getWelcomeMessage()];
  }
};

const saveChatMessages = (messages) => {
  if (typeof window === "undefined" || !Array.isArray(messages)) {
    return;
  }

  try {
    const serializable = messages.map((message) => ({
      ...message,
      timestamp: message.timestamp ? new Date(message.timestamp).toISOString() : null,
    }));
    sessionStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(serializable));
  } catch {
    // sessionStorage full or unavailable — ignore
  }
};

const clearChatSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(CHAT_SESSION_KEY);
};

export {
  CHAT_SESSION_KEY,
  getWelcomeMessage,
  loadChatMessages,
  saveChatMessages,
  clearChatSession,
};
