import { Suspense } from "react";
import CreateShopForm from "./components/shopui/CreateShopForm";
import Loader from "./components/ui/Loader";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Uddoktahut</h1>
      <Suspense fallback={<Loader />}>
        <CreateShopForm />
      </Suspense>
    </div>
  );
}
