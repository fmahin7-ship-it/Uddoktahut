"use client";

import type { ChatInterfaceHandle } from "@/features/analytics/types";
import { useRef, useCallback } from "react";
import ChatInterface from "@/features/analytics/components/ChatInterface";
import QuickInsightsSidebar from "@/features/analytics/components/QuickInsightsSidebar";

const AIBusinessAnalytics = () => {
  const chatRef = useRef<ChatInterfaceHandle>(null);

  const handleQuestionSelect = useCallback((question: string) => {
    if (chatRef.current && question) {
      chatRef.current.handleSuggestedQuestion(question);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ChatInterface ref={chatRef} />
      </div>

      <div className="lg:col-span-1">
        <QuickInsightsSidebar onQuestionSelect={handleQuestionSelect} />
      </div>
    </div>
  );
};

export default AIBusinessAnalytics;
