import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "@/features/storefront/components/checkout/CheckoutForm";
import { ShopProvider } from "@/shared/providers/shop-provider";
import type { Product } from "@/shared/api/types";

jest.mock("@/features/orders/actions", () => ({
  placeStoreOrder: jest.fn(),
}));
jest.mock("sonner", () => ({ toast: { success: jest.fn(), error: jest.fn() } }));

const { placeStoreOrder } = jest.requireMock("@/features/orders/actions") as {
  placeStoreOrder: jest.Mock;
};

const saree: Product = {
  id: 1,
  name: "Cotton Saree",
  image: null,
  price: "1250.00",
  stock: 5,
  status: "active",
  category: "Clothing",
  sku: "SAR-1",
  store_id: 1,
};

const renderCheckout = () =>
  render(
    <ShopProvider
      initialData={{
        store_name: "rahim",
        template_name: "classic",
        isActive: true,
        products: [saree],
      }}
    >
      <CheckoutForm />
    </ShopProvider>
  );

const fillAndSubmit = async () => {
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText("Your name"), "Karim");
  await user.type(screen.getByPlaceholderText("01XXXXXXXXX"), "01712345678");
  await user.type(screen.getByPlaceholderText("Area, city, details"), "House 5, Dhanmondi, Dhaka");
  await user.click(screen.getByRole("button", { name: /place order/i }));
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    "uddoktahut_cart_rahim",
    JSON.stringify({ items: [{ productId: 1, quantity: 2 }] })
  );
});

test("shows the backend's error to the customer when the order fails", async () => {
  placeStoreOrder.mockResolvedValue({
    ok: false,
    error: '"Cotton Saree" has only 1 left in stock.',
    status: 409,
  });

  renderCheckout();
  await fillAndSubmit();

  expect(
    await screen.findByText('"Cotton Saree" has only 1 left in stock.')
  ).toBeInTheDocument();
  // The cart is kept so the customer can fix it.
  expect(localStorage.getItem("uddoktahut_cart_rahim")).not.toBeNull();
});

test("sends the cart as a COD order and clears it on success", async () => {
  placeStoreOrder.mockResolvedValue({
    ok: true,
    data: { order_number: "ORD-1-ABC", total: 2500 },
  });

  renderCheckout();
  await fillAndSubmit();

  await waitFor(() => expect(placeStoreOrder).toHaveBeenCalledTimes(1));
  expect(placeStoreOrder).toHaveBeenCalledWith({
    storeName: "rahim",
    payload: expect.objectContaining({
      paymentMethod: "cod",
      items: [{ productId: 1, quantity: 2 }],
      customer: {
        name: "Karim",
        phone: "01712345678",
        address: "House 5, Dhanmondi, Dhaka",
      },
    }),
  });
  await waitFor(() => expect(localStorage.getItem("uddoktahut_cart_rahim")).toBeNull());
});

test("does not submit an invalid phone number", async () => {
  renderCheckout();
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText("Your name"), "Karim");
  await user.type(screen.getByPlaceholderText("01XXXXXXXXX"), "12345");
  await user.type(screen.getByPlaceholderText("Area, city, details"), "House 5, Dhaka");
  await user.click(screen.getByRole("button", { name: /place order/i }));

  expect(await screen.findByText(/valid 11-digit Bangladesh phone/i)).toBeInTheDocument();
  expect(placeStoreOrder).not.toHaveBeenCalled();
});
