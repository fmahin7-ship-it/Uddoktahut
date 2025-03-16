export default async function StorePage({ params }) {
  const { shopSlug } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to {shopSlug}!</h1>
      <p>This is your new shop.</p>
    </div>
  );
}
