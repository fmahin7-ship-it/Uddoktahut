import { LegalList, LegalPage, LegalSection } from "@/features/legal/components/LegalPage";
import { COMPANY } from "@/shared/constants/company";

export const metadata = {
  title: "Refund Policy — UddoktaHut",
  description: "Cancellations and refunds for UddoktaHut subscriptions.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy">
      <LegalSection title="Free trial">
        <p>The 7-day free trial doesn’t require a card, so you’re never charged for it.</p>
      </LegalSection>

      <LegalSection title="Cancelling your subscription">
        <LegalList
          items={[
            "You can cancel at any time from your dashboard or by emailing us.",
            "After you cancel, you keep access until the end of the month you've already paid for.",
            "You won't be charged again after cancelling.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Refunds">
        <p>
          Subscriptions are billed monthly in advance, and we don’t usually refund part of a month. We will refund
          you if:
        </p>
        <LegalList
          items={[
            "you were charged by mistake, for example a duplicate charge or a charge after you cancelled; or",
            "the service had a major failure, or you're otherwise entitled to a refund under the Australian Consumer Law.",
          ]}
        />
        <p>Approved refunds go back to the original payment method, usually within 5–10 business days.</p>
      </LegalSection>

      <LegalSection title="How to ask for a refund">
        <p>
          Email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-green-600 hover:underline dark:text-green-400">
            {COMPANY.email}
          </a>{" "}
          from the email address on your account, with your store name and the charge you’re asking about. We’ll reply
          within 5 business days.
        </p>
      </LegalSection>

      <LegalSection title="Purchases from stores on UddoktaHut">
        <p>
          If you bought something from a store that runs on {COMPANY.name}, that store is the seller. Please contact
          the store directly about returns and refunds for your order.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
