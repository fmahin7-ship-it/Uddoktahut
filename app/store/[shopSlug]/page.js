export default function ShopPage({ params }) {
  return (
    <div>
      <h1>Welcome to {params.shopSlug}s Store!</h1>
      <p>This is a dynamically generated shop.</p>
    </div>
  );
}
