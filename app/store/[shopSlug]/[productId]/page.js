import BackButton from "@/app/components/BackButton";
import NextButton from "@/app/components/NextButton";

async function ProductDetails({ params }) {
  const { productId } = await params;
  return (
    <div className="flex flex-col mt-6 items-center justify-center">
      <h1>Product Details Page</h1>
      <p>{productId}</p>
      <NextButton
        title="Proceed to checkout"
        destination={`${productId}/checkout`}
      />
      <BackButton title="Go Back" />
    </div>
  );
}

export default ProductDetails;
