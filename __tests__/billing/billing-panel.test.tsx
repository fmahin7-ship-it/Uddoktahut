import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BillingPanel from "@/features/billing/components/BillingPanel";
import { UserProvider } from "@/shared/providers/user-provider";
import type { SessionUser } from "@/shared/api/types";

jest.mock("@/features/billing/actions", () => ({
  startCheckout: jest.fn(),
  confirmCheckout: jest.fn(),
  openBillingPortal: jest.fn(),
  reloadSubscription: jest.fn(),
}));

const mockSearchParam = jest.fn<string | null, [string]>(() => null);
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: (key: string) => mockSearchParam(key) }),
}));

const {
  startCheckout,
  confirmCheckout,
  openBillingPortal,
  reloadSubscription,
} = jest.requireMock("@/features/billing/actions") as {
  startCheckout: jest.Mock;
  confirmCheckout: jest.Mock;
  openBillingPortal: jest.Mock;
  reloadSubscription: jest.Mock;
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

const proSeller = (): SessionUser => ({
  ...trialSeller("AU"),
  planSlug: "pro",
  planName: "Pro",
  subscriptionStatus: "active",
  billingProvider: "stripe",
  endDate: "2026-12-01T00:00:00.000Z",
});

const renderPanel = (user: SessionUser) =>
  render(
    <UserProvider initialData={user}>
      <BillingPanel />
    </UserProvider>
  );

beforeEach(() => {
  mockSearchParam.mockReturnValue(null);
  confirmCheckout.mockResolvedValue({ ok: true, alreadyActive: false });
  reloadSubscription.mockResolvedValue({ user: trialSeller("AU") });
  openBillingPortal.mockResolvedValue({
    url: "https://billing.stripe.com/p/session/test",
  });
});

test("an Australian store on trial can upgrade to Pro at the AUD price", () => {
  renderPanel(trialSeller("AU"));
  expect(screen.getByText(/Free trial until 5 November 2026/)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Upgrade to Pro · A$39 / month" })
  ).toBeInTheDocument();
});

test("a Bangladesh store is told card checkout is not available", () => {
  renderPanel(trialSeller("BD"));
  expect(
    screen.getByText(/not available for Bangladesh stores/)
  ).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /upgrade/i })).not.toBeInTheDocument();
});

test("shows the reason when checkout cannot start", async () => {
  startCheckout.mockResolvedValue({ error: "Stripe is not configured." });
  renderPanel(trialSeller("AU"));

  await userEvent
    .setup()
    .click(screen.getByRole("button", { name: /upgrade to pro/i }));

  expect(startCheckout).toHaveBeenCalledWith("pro");
  expect(await screen.findByText("Stripe is not configured.")).toBeInTheDocument();
});

test("returning from a cancelled Stripe checkout says nothing was charged", () => {
  mockSearchParam.mockImplementation((key) =>
    key === "checkout" ? "cancel" : null
  );
  renderPanel(trialSeller("AU"));
  expect(
    screen.getByText(/Payment cancelled. You have not been charged./)
  ).toBeInTheDocument();
});

test("returning from success confirms the Stripe session then reloads the plan", async () => {
  mockSearchParam.mockImplementation((key) => {
    if (key === "checkout") return "success";
    if (key === "session_id") return "cs_test_abc";
    return null;
  });
  reloadSubscription.mockResolvedValue({ user: proSeller() });

  renderPanel(trialSeller("AU"));

  await waitFor(() =>
    expect(confirmCheckout).toHaveBeenCalledWith("cs_test_abc")
  );
  await waitFor(() => expect(reloadSubscription).toHaveBeenCalled());
  expect(await screen.findByText(/You are on Pro/)).toBeInTheDocument();
});

test("a Stripe Pro seller can open Manage billing", async () => {
  renderPanel(proSeller());
  const button = screen.getByRole("button", { name: /manage billing/i });
  await userEvent.setup().click(button);
  expect(openBillingPortal).toHaveBeenCalled();
});

test("Manage billing stays visible when Stripe Pro has expired", () => {
  renderPanel({
    ...proSeller(),
    isActive: false,
    subscriptionStatus: "past_due",
    endDate: "2026-01-01T00:00:00.000Z",
  });
  expect(
    screen.getByRole("button", { name: /manage billing/i })
  ).toBeInTheDocument();
});
