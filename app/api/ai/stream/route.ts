import type { NextRequest } from "next/server";

/** Pass through the content type and any rate-limit Retry-After header. */
const proxyHeaders = (response: Response): Headers => {
  const headers = new Headers({
    "Content-Type": response.headers.get("Content-Type") || "text/plain; charset=utf-8",
  });
  const retryAfter = response.headers.get("Retry-After");
  if (retryAfter) headers.set("Retry-After", retryAfter);
  return headers;
};

export async function POST(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { question, history } = await request.json();

  // Proxy the stream directly
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/ai/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        history: Array.isArray(history) ? history : [],
      }),
    }
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: proxyHeaders(response),
  });
}
