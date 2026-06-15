import LandingPage from "@/components/landing/LandingPage";
import "@/components/landing/landing.css";

export const metadata = {
  title: "UddoktaHut — AI-চালিত ই-কমার্স SaaS",
  description:
    "বাংলাদেশি উদ্যোক্তাদের জন্য AI-চালিত ই-কমার্স SaaS। অনলাইন স্টোর, AI copilot, টোকেন-ভিত্তিক প্রাইসিং। ৭ দিন ফ্রি ট্রায়াল।",
  openGraph: {
    title: "UddoktaHut — AI-চালিত ই-কমার্স SaaS",
    description:
      "দোকান খুলুন, AI দিয়ে ব্যবসা বুঝুন। Live AI copilot + স্পষ্ট রোডম্যাপ।",
    url: "https://uddoktahut.com",
    siteName: "UddoktaHut",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UddoktaHut" }],
    locale: "bn_BD",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <LandingPage />
    </main>
  );
}
