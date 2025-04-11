import BackButton from "../common/BackButton";
import NextButton from "../common/NextButton";

function ProductDetails({ productId }) {

  return (
    <div className="flex flex-col mt-6 items-center justify-center">
      <h1 className="text-xl font-semibold">Product Details</h1>
      <p className="text-gray-500">Product ID: {productId}</p>

      <div className="mt-10 mb-10">
        <NextButton
          title="Proceed to checkout"
          destination={`checkout`}
        />
      </div>
      <BackButton title="Go Back" />
    </div>
  );
}

export default ProductDetails;
