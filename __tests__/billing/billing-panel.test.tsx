import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BillingPanel from "@/features/billing/components/BillingPanel";
import { UserProvider } from "@/shared/providers/user-provider";
import type { SessionUser } from "@/shared/api/types";

jest.mock("@/features/billing/actions", () => ({
  startCheckout: jest.fn(),
  reloadSubscription: jest.fn(),
}));

const mockSearchParam = jest.fn<string | null, [string]>(() => null);
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: (key: string) => mockSearchParam(key) }),
}));

const { startCheckout } = jest.requireMock("@/features/billing/actions") as {
  startCheckout: jest.Mock;
};

const trialSeller = (country: "AU" | "BD"): SessionUser => ({
  name: "Test Seller",
  email: "seller@example.com",
  phoneNumber: null,
  onboarded: true,
  storeName: "test-store",
  country,
  isActive: true,
  planSlug: "trial",
  planName: "Free Trial",
  subscriptionStatus: "trialing",
  endDate: "2026-11-05T00:00:00.000Z",
});

const renderPanel = (user: SessionUser) =>
  render(
    <UserProvider initialData={user}>
      <BillingPanel />
    </UserProvider>
  );

beforeEach(() => mockSearchParam.mockReturnValue(null));

test("an Australian store on trial can upgrade to Pro at the AUD price", () => {
  renderPanel(trialSeller("AU"));
  expect(screen.getByText(/Free trial until 5 November 2026/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Upgrade to Pro · A$39 / month" })).toBeInTheDocument();
});

test("a Bangladesh store is told card checkout is not available", () => {
  renderPanel(trialSeller("BD"));
  expect(screen.getByText(/not available for Bangladesh stores/)).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /upgrade/i })).not.toBeInTheDocument();
});

test("shows the reason when checkout cannot start", async () => {
  startCheckout.mockResolvedValue({ error: "Stripe is not configured." });
  renderPanel(trialSeller("AU"));

  await userEvent.setup().click(screen.getByRole("button", { name: /upgrade to pro/i }));

  expect(startCheckout).toHaveBeenCalledWith("pro");
  expect(await screen.findByText("Stripe is not configured.")).toBeInTheDocument();
});

test("returning from a cancelled Stripe checkout says nothing was charged", () => {
  mockSearchParam.mockImplementation((key) => (key === "checkout" ? "cancel" : null));
  renderPanel(trialSeller("AU"));
  expect(screen.getByText(/Payment cancelled. You have not been charged./)).toBeInTheDocument();
});
