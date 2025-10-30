"use client";

import { useRef, useCallback } from "react";
import ChatInterface from "./ChatInterface";
import QuickInsightsSidebar from "./QuickInsightsSidebar";

const AIBusinessAnalytics = () => {
  const chatRef = useRef(null);

  const handleQuestionSelect = useCallback((question) => {
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
