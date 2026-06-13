export async function POST(request) {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { question } = await request.json();

  // Proxy the stream directly
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/ai/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    }
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "text/plain; charset=utf-8",
      ...(response.headers.get("Retry-After")
        ? { "Retry-After": response.headers.get("Retry-After") }
        : {}),
    },
  });
}
