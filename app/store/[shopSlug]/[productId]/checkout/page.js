import BackButton from "@/app/components/BackButton";

async function CheckoutPage({ params }) {
  const { productId } = await params;
  return (
    <div className="flex flex-col mt-6 items-center justify-center">
      <h1>Checkout Page for product : {productId}</h1>
      <BackButton title="Go Back" />
    </div>
  );
}

export default CheckoutPage;
