import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/config";

// Middleware normally sends "/" to /bn or /en before this renders; this is only a fallback.
export default function RootRedirect() {
  redirect(`/${DEFAULT_LOCALE}`);
}
