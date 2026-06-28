import { useState, useCallback, useRef, useEffect } from "react";

const parseApiError = async (response) => {
  let message = `HTTP ${response.status}: ${response.statusText}`;

  try {
    const errorText = await response.text();
    if (!errorText) {
      return message;
    }

    try {
      const errorData = JSON.parse(errorText);
      if (errorData?.message) {
        return errorData.message;
      }
      if (errorData?.error) {
        return errorData.message || String(errorData.error);
      }
    } catch {
      return errorText;
    }
  } catch {
    // keep default message
  }

  return message;
};

const readTextStream = async (reader, onChunk) => {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      if (buffer.length > 0) {
        onChunk?.(buffer);
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    if (buffer.length > 5 || buffer.includes(" ")) {
      onChunk?.(buffer);
      buffer = "";
    }
  }
};

export function useAIStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const streamQuery = useCallback(
    async (query, onChunk, onComplete, onError) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsStreaming(true);
      setError(null);

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
          credentials: "include",
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(await parseApiError(response));
        }

        await readTextStream(response.body.getReader(), onChunk);

        clearTimeout(timeoutId);
        setIsStreaming(false);
        onComplete?.();
        abortControllerRef.current = null;
      } catch (err) {
        clearTimeout(timeoutId);
        setIsStreaming(false);
        setError(err);
        abortControllerRef.current = null;

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
