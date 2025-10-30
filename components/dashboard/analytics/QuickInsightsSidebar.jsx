import { TrendingUp, Sparkles, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickInsightsSidebar({ onQuestionSelect }) {
  const suggestedQuestions = [
    "Which products will perform best in winter?",
    "What are my top selling categories?",
    "Show me sales trends for the last month",
    "Which products need restocking soon?",
    "What's the best pricing strategy for my store?",
  ];

  const handleQuestionClick = (question) => {
    if (onQuestionSelect && typeof onQuestionSelect === "function") {
      onQuestionSelect(question);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full">
      {/* Quick Insights Card */}
      <Card className="border-green-200 dark:border-green-800 w-full">
        <CardHeader className="pb-1">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <TrendingUp className="w-5 h-5" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-[3px] px-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex items-start gap-2 p-2 h-auto text-left justify-start w-full text-sm text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700
               dark:hover:text-green-300 transition-colors whitespace-normal overflow-hidden cursor-pointer"
              onClick={() => handleQuestionClick(question)}
            >
              <Sparkles className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="break-words text-left flex-1 min-w-0 word-wrap">
                {question}
              </span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Analytics Tips Card */}
      <Card className="border-green-200 dark:border-green-800 w-full">
        <CardHeader className="pb-1">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Package className="w-5 h-5" />
            Analytics Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full overflow-hidden">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="break-words">• Ask about seasonal trends</li>
            <li className="break-words">• Compare product performance</li>
            <li className="break-words">• Get pricing recommendations</li>
            <li className="break-words">• Inventory optimization tips</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
