import type { ChatHistoryEntry } from "@/features/analytics/types";
import { useState, useCallback, useRef, useEffect } from "react";

const parseApiError = async (response: Response): Promise<string> => {
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

const readTextStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk?: (chunk: string) => void
) => {
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
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const streamQuery = useCallback(
    async (
      query: string,
      history: ChatHistoryEntry[] = [],
      onChunk?: (chunk: string) => void,
      onComplete?: () => void,
      onError?: (error: Error) => void
    ) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

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
          body: JSON.stringify({
            question: query,
            history: Array.isArray(history) ? history : [],
          }),
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(await parseApiError(response));
        }

        if (!response.body) throw new Error("Empty response from server");
        await readTextStream(response.body.getReader(), onChunk);

        clearTimeout(timeoutId);
        setIsStreaming(false);
        onComplete?.();
        abortControllerRef.current = null;
      } catch (err) {
        clearTimeout(timeoutId);
        setIsStreaming(false);
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        abortControllerRef.current = null;

        if (error.name !== "AbortError") {
          onError?.(error);
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
