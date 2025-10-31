import { useState, useCallback, useRef, useEffect } from "react";

export function useAIStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const streamQuery = useCallback(
    async (query, onChunk, onComplete, onError) => {
      // Abort any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      setIsStreaming(true);
      setError(null);

      // Safety timeout to prevent runaway streams
      const timeoutId = setTimeout(() => {
        abortControllerRef.current?.abort();
        setIsStreaming(false);
        onError?.(new Error("Request timeout after 30 seconds"));
      }, 30000);

      try {
        const response = await fetch("/api/ai/stream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: query }),
          credentials: "include", // Important for cookie-based auth
          signal: abortControllerRef.current.signal, // Add abort signal
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Send any remaining buffer content
            if (buffer.length > 0) {
              onChunk?.(buffer);
            }
            clearTimeout(timeoutId); // Clear timeout on successful completion
            setIsStreaming(false);
            onComplete?.();
            abortControllerRef.current = null; // Clear reference
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
        clearTimeout(timeoutId); // Clear timeout on error
        setIsStreaming(false);
        setError(err);
        abortControllerRef.current = null; // Clear reference

        // Don't call onError if it was aborted (user navigated away)
        if (err.name !== "AbortError") {
          onError?.(err);
        }
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
