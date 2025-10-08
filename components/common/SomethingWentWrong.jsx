export default function SomethingWentWrong() {
  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Something went wrong
      </h2>
      <p className="text-neutral-700 mb-2">
        {storeData.message || "Network/server error. Please try again later."}
      </p>
    </div>
  );
}
