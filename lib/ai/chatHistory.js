const MAX_HISTORY_MESSAGES = 8;

/**
 * Build API history from UI messages (excludes the message about to be sent).
 */
const buildChatHistory = (messages) => {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message) =>
        (message.type === "user" || message.type === "ai") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.type === "user" ? "user" : "assistant",
      content: message.content.trim(),
    }));
};

export { buildChatHistory, MAX_HISTORY_MESSAGES };
