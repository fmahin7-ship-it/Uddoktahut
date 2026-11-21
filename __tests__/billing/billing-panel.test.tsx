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
  changeSubscriptionPlan: jest.fn(),
  cancelScheduledPlanChange: jest.fn(),
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
  changeSubscriptionPlan,
  cancelScheduledPlanChange,
} = jest.requireMock("@/features/billing/actions") as {
  startCheckout: jest.Mock;
  confirmCheckout: jest.Mock;
  openBillingPortal: jest.Mock;
  reloadSubscription: jest.Mock;
  changeSubscriptionPlan: jest.Mock;
  cancelScheduledPlanChange: jest.Mock;
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

const basicSeller = (): SessionUser => ({
  ...proSeller(),
  planSlug: "basic",
  planName: "Basic",
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
  changeSubscriptionPlan.mockResolvedValue({
    ok: true,
    mode: "upgraded",
    planSlug: "pro",
    changeAt: null,
  });
  cancelScheduledPlanChange.mockResolvedValue({ ok: true });
});

test("an Australian trial can choose Basic, Pro, or Business", () => {
  renderPanel(trialSeller("AU"));
  expect(screen.getByText(/Free trial until 5 November 2026/)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Get Basic · A$15 / month" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Upgrade to Pro · A$39 / month" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Get Business · A$99 / month" })
  ).toBeInTheDocument();
});

test("a Bangladesh store is told card checkout is not available", () => {
  renderPanel(trialSeller("BD"));
  expect(
    screen.getByText(/not available for Bangladesh stores/)
  ).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /basic|pro|business/i })).not.toBeInTheDocument();
});

test("shows the reason when checkout cannot start", async () => {
  startCheckout.mockResolvedValue({ error: "Stripe is not configured." });
  renderPanel(trialSeller("AU"));

  await userEvent
    .setup()
    .click(screen.getByRole("button", { name: /get basic/i }));

  expect(startCheckout).toHaveBeenCalledWith("basic");
  expect(await screen.findByText("Stripe is not configured.")).toBeInTheDocument();
});

test("a Basic seller can upgrade to Pro without checkout", async () => {
  reloadSubscription.mockResolvedValue({ user: proSeller() });
  renderPanel(basicSeller());
  await userEvent
    .setup()
    .click(screen.getByRole("button", { name: /upgrade to pro/i }));
  expect(changeSubscriptionPlan).toHaveBeenCalledWith("pro");
  expect(startCheckout).not.toHaveBeenCalled();
});

test("a Pro seller can schedule Basic at period end", async () => {
  renderPanel(proSeller());
  await userEvent
    .setup()
    .click(screen.getByRole("button", { name: /switch to basic at period end/i }));
  expect(changeSubscriptionPlan).toHaveBeenCalledWith("basic");
});

test("scheduled downgrade shows Keep Pro", async () => {
  renderPanel({
    ...proSeller(),
    pendingPlanSlug: "basic",
    pendingPlanChangeAt: "2026-12-01T00:00:00.000Z",
  });
  expect(
    screen.getByText(/Your plan will change to Basic on 1 December 2026/)
  ).toBeInTheDocument();
  await userEvent.setup().click(screen.getByRole("button", { name: /keep pro/i }));
  expect(cancelScheduledPlanChange).toHaveBeenCalled();
});

test("returning from success confirms the Stripe session then reloads the plan", async () => {
  mockSearchParam.mockImplementation((key) => {
    if (key === "checkout") return "success";
    if (key === "session_id") return "cs_test_abc";
    return null;
  });
  reloadSubscription.mockResolvedValue({ user: basicSeller() });

  renderPanel(trialSeller("AU"));

  await waitFor(() =>
    expect(confirmCheckout).toHaveBeenCalledWith("cs_test_abc")
  );
  await waitFor(() => expect(reloadSubscription).toHaveBeenCalled());
  expect(await screen.findByText(/You are on Basic/)).toBeInTheDocument();
});

test("Manage billing stays visible when Stripe plan has expired", () => {
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
