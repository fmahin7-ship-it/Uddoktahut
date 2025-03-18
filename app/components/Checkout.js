import BackButton from "./BackButton";

async function Checkout({ productId }) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  return (
    <div className="flex flex-col mt-6 items-center justify-center">
      <h1>Checkout Page for product : {productId}</h1>
      <BackButton title="Go Back" />
    </div>
  );
}

export default Checkout;
