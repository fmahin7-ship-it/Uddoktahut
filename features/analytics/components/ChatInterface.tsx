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
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import MessageList from "@/features/analytics/components/MessageList";
import ChatInput from "@/features/analytics/components/ChatInput";
import { loadChatMessages, saveChatMessages } from "@/features/analytics/lib/chatSession";
import type {
  ChatInputHandle,
  ChatInterfaceHandle,
  ChatMessage,
  ChatOperation,
} from "@/features/analytics/types";

const ChatInterface = forwardRef<ChatInterfaceHandle>((_, ref) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChatMessages());
  const chatInputRef = useRef<ChatInputHandle>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => saveChatMessages(messages), 300);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Expose methods to parent component
  useImperativeHandle(
    ref,
    () => ({
      handleSuggestedQuestion: (question: string) => {
        if (chatInputRef.current) {
          chatInputRef.current.setMessage(question);
        }
      },
    }),
    []
  );

  // Handle message operations from ChatInput
  const handleAddMessage = useCallback((operation: ChatOperation) => {
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

  const formatTime = (timestamp: Date) => {
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

      <ChatInput ref={chatInputRef} messages={messages} onAddMessage={handleAddMessage} />
    </Card>
  );
});

// Set display name for better debugging
ChatInterface.displayName = "ChatInterface";

export default ChatInterface;
