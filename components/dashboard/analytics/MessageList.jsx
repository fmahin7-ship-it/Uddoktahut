import { useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { CardContent } from "@/components/ui/card";

export default function MessageList({ messages, formatTime }) {
  const messagesEndRef = useRef(null);

  // Derive streaming state from messages (AI message with no content and no timestamp)
  const isStreaming = messages.some(
    (msg) => msg.type === "ai" && !msg.content && !msg.timestamp
  ); // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <CardContent className="flex-1 p-0 overflow-hidden">
      <div className="h-full overflow-y-auto p-4">
        <div className="space-y-4 min-w-0">
          {messages.map((message) => {
            // Don't render AI messages that have no content - they'll show in the loading state instead
            if (message.type === "ai" && !message.content) {
              return null;
            }

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 break-words overflow-hidden ${
                    message.type === "user"
                      ? "bg-green-600 text-white ml-12"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">
                    {message.content}
                  </p>
                  {message.timestamp && (
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user"
                          ? "text-green-200"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading State */}
          {isStreaming && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Invisible element for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </CardContent>
  );
}
