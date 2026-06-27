"use server";

import { cookies } from "next/headers";

export async function updateStoreTemplate({ storeName, templateName }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/${storeName}/template`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ templateName }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to update product");
      } catch {
        throw new Error(errorText || "Failed to update product");
      }
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating store template:", error);
    throw error;
  }
}
