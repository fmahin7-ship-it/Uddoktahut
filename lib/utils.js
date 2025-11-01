import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
  return string ? string[0].toUpperCase() + string.slice(1) : "";
}
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}
export function getShopSlug(url) {
  try {
    const { hostname } = new URL(url);
    // hostname will be like "shoporia.uddoktahut.com"
    return hostname.split(".")[0];
  } catch {
    return null;
  }
}

// Link detection and parsing utilities
// Enhanced regular expression to detect URLs
// Matches http://, https://, www., and domain.com patterns
const URL_REGEX =
  /(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}(?:\/[^\s<>"]*)?)/gi;

// Markdown link regex: [text](url)
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

export const hasLinks = (text) => {
  return URL_REGEX.test(text) || MARKDOWN_LINK_REGEX.test(text);
};

export const parseTextWithLinks = (text) => {
  if (!text) return [];

  const parts = [];

  // First, find and process Markdown links
  const markdownMatches = [];
  MARKDOWN_LINK_REGEX.lastIndex = 0;

  let markdownMatch = MARKDOWN_LINK_REGEX.exec(text);
  while (markdownMatch !== null) {
    markdownMatches.push({
      fullMatch: markdownMatch[0],
      text: markdownMatch[1],
      url: markdownMatch[2],
      index: markdownMatch.index,
      length: markdownMatch[0].length,
    });

    markdownMatch = MARKDOWN_LINK_REGEX.exec(text); // Get next match
  }

  // Process markdown links first (they take priority)
  let lastIndex = 0;
  for (const match of markdownMatches) {
    // Add text before the markdown link
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      // Process plain URLs in the text before markdown link
      parts.push(...parseTextWithPlainLinks(beforeText));
    }

    // Add the markdown link
    let url = match.url;
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    parts.push({
      type: "link",
      content: match.text, // Display text from markdown
      url: url,
    });

    lastIndex = match.index + match.length;
  }

  // Process remaining text after last markdown link
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseTextWithPlainLinks(remainingText));
  }

  // If no markdown links found, process as plain URLs
  if (markdownMatches.length === 0) {
    return parseTextWithPlainLinks(text);
  }

  return parts;
};

// Helper function to parse plain URLs (non-markdown)
const parseTextWithPlainLinks = (text) => {
  if (!text) return [];

  const parts = [];
  let lastIndex = 0;

  // Reset regex lastIndex
  URL_REGEX.lastIndex = 0;

  // Get first match
  let match = URL_REGEX.exec(text);

  while (match !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    // Add the link
    let url = match[0];
    // Add protocol if missing
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    parts.push({
      type: "link",
      content: match[0], // Original text
      url: url, // Processed URL with protocol
    });

    lastIndex = match.index + match[0].length;

    // Get next match for next iteration
    match = URL_REGEX.exec(text);
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  // If no links found, return the original text as a single text part
  if (parts.length === 0) {
    parts.push({
      type: "text",
      content: text,
    });
  }

  return parts;
};

export const ensureProtocol = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return "https://" + url;
};
