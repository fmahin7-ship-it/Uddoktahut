import ShopFeatureProduct from "./ShopFeatureProduct";

export default function ShopFeatureProducts({ deliverySystem }) {
  return (
    <section className="bg-white px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
      <ShopFeatureProduct deliverySystem={deliverySystem} />
    </section>
  );
}
