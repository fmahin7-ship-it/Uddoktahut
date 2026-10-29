import Link from "next/link";
import { LegalList, LegalPage, LegalSection } from "@/features/legal/components/LegalPage";
import { COMPANY } from "@/shared/constants/company";

export const metadata = {
  title: "Terms of Service — UddoktaHut",
  description: "The terms that apply when you use UddoktaHut.",
  alternates: { canonical: "/terms" },
};

const linkClass = "text-green-600 hover:underline dark:text-green-400";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <LegalSection title="About these terms">
        <p>
          These terms apply when you use {COMPANY.name}, operated by {COMPANY.legalName} ({COMPANY.location}). By
          creating an account you agree to them. If you use {COMPANY.name} for a business, you confirm you’re
          authorised to accept these terms on its behalf.
        </p>
      </LegalSection>

      <LegalSection title="The service">
        <p>
          {COMPANY.name} lets you run an online store and, on plans that include it, use an AI copilot that answers
          questions about your store data. Features available to you depend on your plan.
        </p>
      </LegalSection>

      <LegalSection title="Your account">
        <LegalList
          items={[
            "Give us accurate information and keep it up to date.",
            "Keep your password safe. You're responsible for activity on your account.",
            "Tell us promptly if you think your account has been accessed without permission.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Free trial">
        <p>
          New accounts get a 7-day free trial with no card required. The trial includes the online store but not the
          AI copilot. At the end of the trial, choose a paid plan to keep using the service.
        </p>
      </LegalSection>

      <LegalSection title="Plans and billing">
        <LegalList
          items={[
            "Paid plans are billed monthly in advance, in the currency shown at checkout.",
            "Prices include GST where GST applies.",
            "Payments are processed by Stripe. Your subscription renews automatically each month until you cancel.",
            "We may change prices with at least 30 days' notice. The change applies from your next billing period.",
          ]}
        />
        <p>
          Cancellations and refunds are covered in our{" "}
          <Link href="/refunds" className={linkClass}>
            Refund Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You must not use {COMPANY.name} to:</p>
        <LegalList
          items={[
            "Sell illegal, counterfeit or prohibited goods, or goods you don't have the right to sell.",
            "Mislead or defraud customers, or break consumer, privacy or other laws.",
            "Upload content that infringes someone else's rights or is harmful or abusive.",
            "Attack, overload, scrape or try to break the security of the service.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Your store and your content">
        <p>
          You own the content you add, including products, images and store details. You give us permission to host,
          display and process it so we can run the service. You’re the seller to your customers: you’re responsible
          for your products, prices, delivery, customer service and refunds to your customers.
        </p>
      </LegalSection>

      <LegalSection title="AI copilot">
        <p>
          The AI copilot generates answers automatically from your store data. Answers can be incomplete or wrong, so
          check anything important before you rely on it. AI plans include a monthly usage allowance; when it runs
          out, the copilot pauses until the next month while your store keeps working.
        </p>
      </LegalSection>

      <LegalSection title="Availability and changes">
        <p>
          We work to keep {COMPANY.name} running smoothly, but we can’t promise it will always be available or error
          free. We may change or improve features over time and will give reasonable notice of changes that
          significantly affect paid plans.
        </p>
      </LegalSection>

      <LegalSection title="Suspension and closing your account">
        <p>
          You can close your account at any time. We may suspend or close accounts that break these terms or put
          other users or the service at risk. Where reasonable, we’ll contact you first.
        </p>
      </LegalSection>

      <LegalSection title="Australian Consumer Law and liability">
        <p>
          Nothing in these terms excludes rights you have under the Australian Consumer Law that can’t be excluded.
          To the extent the law allows, we’re not liable for indirect or consequential loss, such as lost profits or
          lost data, and our total liability is limited to the fees you paid us in the three months before the claim.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these terms. We’ll post the new version here and tell you about significant changes by
          email. If you keep using the service after a change takes effect, the new terms apply.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>These terms are governed by the laws of Victoria, Australia.</p>
      </LegalSection>
    </LegalPage>
  );
}
