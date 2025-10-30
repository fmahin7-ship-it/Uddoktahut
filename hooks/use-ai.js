import { useState, useCallback } from "react";

export function useAIStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const streamQuery = useCallback(
    async (query, onChunk, onComplete, onError) => {
      setIsStreaming(true);
      setError(null);

      try {
        // Get token from cookies properly
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        };

        const token = getCookie("accessToken");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/ai/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              question: query,
              useRAG: true,
            }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Send any remaining buffer content
            if (buffer) {
              onChunk?.(buffer);
            }
            setIsStreaming(false);
            onComplete?.();
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Batch updates - send chunks when buffer reaches certain size or after timeout
          if (buffer.length > 5 || buffer.includes(" ")) {
            onChunk?.(buffer);
            buffer = "";
          }
        }
      } catch (err) {
        setIsStreaming(false);
        setError(err);
        onError?.(err);
      }
    },
    []
  );

  return {
    streamQuery,
    isStreaming,
    error,
    isError: !!error,
  };
}
