export const dynamic = "force-static"; // or use ISR-style caching

export async function GET(request, { params }) {
  const { storeName } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/subscription/store/${storeName}`
  );
  const data = await res.json();

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30", // 💥 enables caching
    },
  });
}
