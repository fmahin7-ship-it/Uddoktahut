import type React from "react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "UddoktaHut — AI-powered e-commerce SaaS",
  description: "AI-powered e-commerce SaaS for small businesses. Online store, AI copilot, token-based pricing.",
};

// <html> is rendered by app/(main)/layout.jsx, app/bn/layout.jsx, app/en/layout.jsx and app/not-found.jsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
