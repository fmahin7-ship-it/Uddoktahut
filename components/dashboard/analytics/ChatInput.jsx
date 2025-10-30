import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIStream } from "@/hooks/use-ai";
import { toast } from "sonner";

const ChatInput = forwardRef(
  (
    { onAddMessage, placeholder = "Ask about your business insights..." },
    ref
  ) => {
    const [inputMessage, setInputMessage] = useState("");
    const inputRef = useRef(null);
    const streamingContentRef = useRef("");

    const { streamQuery, isStreaming } = useAIStream();

    // Expose methods to parent component
    useImperativeHandle(
      ref,
      () => ({
        setMessage: (message) => {
          setInputMessage(message);
          // Focus input and move cursor to end
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
              inputRef.current.setSelectionRange(
                message.length,
                message.length
              );
            }
          }, 0);
        },
      }),
      []
    );

    // Helper functions for message creation
    const createUserMessage = useCallback(
      (content) => ({
        id: Date.now(),
        type: "user",
        content,
        timestamp: new Date(),
      }),
      []
    );

    const createAIMessagePlaceholder = useCallback(
      () => ({
        id: Date.now() + 1,
        type: "ai",
        content: "",
        timestamp: null,
      }),
      []
    );

    // Stream handling functions
    const handleStreamChunk = useCallback(
      (aiMessageId, chunk) => {
        streamingContentRef.current += chunk;
        onAddMessage({
          type: "update",
          id: aiMessageId,
          content: streamingContentRef.current,
        });
      },
      [onAddMessage]
    );

    const handleStreamComplete = useCallback(
      (aiMessageId) => {
        onAddMessage({
          type: "update",
          id: aiMessageId,
          timestamp: new Date(),
        });
        inputRef.current?.focus();
      },
      [onAddMessage]
    );

    const handleStreamError = useCallback(
      (aiMessageId, error) => {
        console.error("Error sending message:", error);
        onAddMessage({
          type: "update",
          id: aiMessageId,
          content:
            "Sorry, I'm having trouble connecting right now. Please check your connection and try again.",
          timestamp: new Date(),
        });
        toast.error(error.message || "Failed to get AI response");
        inputRef.current?.focus();
      },
      [onAddMessage]
    );

    // Main send message handler
    const handleSendMessage = useCallback(async () => {
      if (!inputMessage.trim() || isStreaming) return;

      // Create and add user message
      const userMessage = createUserMessage(inputMessage);
      onAddMessage({ type: "add", message: userMessage });

      // Store current message and clear input
      const currentMessage = inputMessage;
      setInputMessage("");

      // Create and add AI placeholder
      const aiMessage = createAIMessagePlaceholder();
      onAddMessage({ type: "add", message: aiMessage });

      // Reset streaming content
      streamingContentRef.current = "";

      // Start streaming
      streamQuery(
        currentMessage,
        (chunk) => handleStreamChunk(aiMessage.id, chunk),
        () => handleStreamComplete(aiMessage.id),
        (error) => handleStreamError(aiMessage.id, error)
      );
    }, [
      inputMessage,
      isStreaming,
      streamQuery,
      createUserMessage,
      createAIMessagePlaceholder,
      handleStreamChunk,
      handleStreamComplete,
      handleStreamError,
      onAddMessage,
    ]);

    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const isDisabled = isStreaming || !inputMessage?.trim();

    return (
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            onKeyPress={handleKeyPress}
            disabled={isStreaming}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isDisabled}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
