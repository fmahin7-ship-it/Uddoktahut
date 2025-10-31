"use client";

import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Bot } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatInterface = forwardRef((_, ref) => {
  // Lazy initialization - function only runs on client, not server
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      type: "ai",
      content:
        "👋 Hi! I'm your AI business analyst. Ask me anything about your products, sales trends, or seasonal insights. For example: 'Which products will shine in winter?' or 'What's my best selling category?'",
      timestamp: new Date(), // Only runs on client
    },
  ]);
  const chatInputRef = useRef(null);

  // Expose methods to parent component
  useImperativeHandle(
    ref,
    () => ({
      handleSuggestedQuestion: (question) => {
        if (chatInputRef.current) {
          chatInputRef.current.setMessage(question);
        }
      },
    }),
    []
  );

  // Handle message operations from ChatInput
  const handleAddMessage = useCallback((operation) => {
    if (operation.type === "add") {
      setMessages((prev) => [...prev, operation.message]);
    } else if (operation.type === "update") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === operation.id
            ? {
                ...msg,
                ...(operation.content !== undefined && {
                  content: operation.content,
                }),
                ...(operation.timestamp !== undefined && {
                  timestamp: operation.timestamp,
                }),
              }
            : msg
        )
      );
    }
  }, []);

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 py-6">
        <CardTitle className="flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span>AI Business Analyst</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Online
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <MessageList messages={messages} formatTime={formatTime} />

      <ChatInput ref={chatInputRef} onAddMessage={handleAddMessage} />
    </Card>
  );
});

// Set display name for better debugging
ChatInterface.displayName = "ChatInterface";

export default ChatInterface;
