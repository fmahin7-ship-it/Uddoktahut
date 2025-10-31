import React from "react";
import { parseTextWithLinks } from "@/lib/utils";

const TextWithLinks = ({
  text,
  className = "",
  linkClassName = "text-blue-500 hover:text-blue-700 underline break-all",
}) => {
  if (!text) return null;

  const parts = parseTextWithLinks(text);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === "link") {
          return (
            <a
              key={index}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
              onClick={(e) => {
                try {
                  new URL(part.url);
                } catch {
                  e.preventDefault();
                  console.warn("Invalid URL:", part.url);
                }
              }}
              title={`Open ${part.content} in new tab`}
            >
              {part.content}
            </a>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
};

export default TextWithLinks;
