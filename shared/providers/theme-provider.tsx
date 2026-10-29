"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * next-themes injects an inline <script> that applies the theme before first
 * paint. The server-rendered copy runs as normal; on the client React 19 warns
 * about rendering a <script>, so there we mark it as inert data instead.
 * (Workaround until next-themes ships a fix; latest is 0.4.6.)
 */
const scriptProps =
  typeof window === "undefined" ? undefined : ({ type: "application/json" } as const)

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  )
}
