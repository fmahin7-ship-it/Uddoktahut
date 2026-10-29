"use server";

import { apiRequest } from "@/shared/api/server";

/** Returns a Result ({ ok, data } | { ok: false, error }). */
export async function updateStoreTemplate({
  storeName,
  templateName,
}: {
  storeName: string;
  templateName: string;
}) {
  return apiRequest(`/store/${storeName}/template`, {
    method: "PATCH",
    auth: true,
    body: { templateName },
    fallbackError: "Failed to update template",
  });
}
