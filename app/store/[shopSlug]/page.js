export default function ShopPage({ params }) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {params.shopSlug}s Shop</h1>
      <p>Enjoy shopping at {params.shopSlug}.uddoktahut.com</p>
    </div>
  );
}
