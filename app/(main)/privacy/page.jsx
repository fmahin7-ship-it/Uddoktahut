import { LegalList, LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/constants/company";

export const metadata = {
  title: "Privacy Policy — UddoktaHut",
  description: "How UddoktaHut collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <LegalSection title="Who we are">
        <p>
          {COMPANY.name} is an online store and AI copilot service operated by {COMPANY.legalName} from{" "}
          {COMPANY.location}. This policy explains how we handle personal information in line with the Australian
          Privacy Principles under the Privacy Act 1988 (Cth).
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <LegalList
          items={[
            "Account details: your name, email address, phone number and password (stored as a secure hash).",
            "Store details: your store name, address, products, prices, stock, images and settings.",
            "Order details: information your customers enter at checkout, such as name, phone number and delivery address.",
            "AI copilot usage: the questions you ask, the answers generated and how much of your monthly AI allowance you use.",
            "Technical details: IP address, browser type and the cookies described below.",
            "Billing details: when paid plans are available, payments are handled by Stripe. We never see or store your full card number.",
          ]}
        />
      </LegalSection>

      <LegalSection title="How we use it">
        <LegalList
          items={[
            "To run your account, your store and your storefront.",
            "To answer your AI copilot questions using your own store's data.",
            "To process subscriptions and send service and billing emails.",
            "To keep the service secure, prevent abuse and fix problems.",
            "To improve the product, using aggregated information that doesn't identify you.",
          ]}
        />
        <p>We don't sell your personal information, and we don't use your store data to train public AI models.</p>
      </LegalSection>

      <LegalSection title="Your customers' information">
        <p>
          When your customers order from your store, you decide what to collect and how to use it. We process that
          information on your behalf to run your store. You're responsible for telling your customers how you use
          their information and for meeting any privacy obligations that apply to your business.
        </p>
      </LegalSection>

      <LegalSection title="Service providers and overseas storage">
        <p>
          We use trusted providers to run the service, including website and server hosting, database hosting, image
          hosting, email delivery, AI model providers and payment processing. These providers may store or process
          information outside Australia, including in the United States. We only share what each provider needs to do
          its job.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>We only use cookies the service needs:</p>
        <LegalList
          items={[
            "A sign-in cookie that keeps you logged in to your dashboard.",
            "A language cookie (NEXT_LOCALE) that remembers whether you chose Bangla or English.",
          ]}
        />
        <p>We don't use advertising or third-party tracking cookies.</p>
      </LegalSection>

      <LegalSection title="Security and retention">
        <p>
          We protect information with encrypted connections, hashed passwords and access controls that keep each
          store's data separate. We keep your information while your account is active and delete or anonymise it
          within a reasonable time after you close your account, unless we need to keep it to meet legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="Access, correction and complaints">
        <p>
          You can ask to access or correct your personal information, or delete your account, by emailing{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-green-600 hover:underline dark:text-green-400">
            {COMPANY.email}
          </a>
          . If you're unhappy with how we've handled your information, contact us first and we'll respond within 30
          days. If you're still not satisfied, you can contact the Office of the Australian Information Commissioner
          (oaic.gov.au).
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy as the service changes. We'll post the new version here and, for significant
          changes, let you know by email.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
