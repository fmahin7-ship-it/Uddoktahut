import BackButton from "@/app/components/BackButton";
import NextButton from "@/app/components/NextButton";

async function ProductDetails({ productId }) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  return (
    <div className="flex flex-col mt-6 items-center justify-center">
      <h1 className="text-xl font-semibold">Product Details</h1>
      <p className="text-gray-500">Product ID: {productId}</p>

      <NextButton
        title="Proceed to checkout"
        destination={`${productId}/checkout`}
      />
      <BackButton title="Go Back" />
    </div>
  );
}

export default ProductDetails;
