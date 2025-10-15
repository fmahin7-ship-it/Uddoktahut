import ClassicFeatureProduct from "./ClassicFeatureProduct";

export default function ClassicFeatureProducts({ deliverySystem }) {
  return (
    <section className="bg-white px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
      <ClassicFeatureProduct deliverySystem={deliverySystem} />
    </section>
  );
}
